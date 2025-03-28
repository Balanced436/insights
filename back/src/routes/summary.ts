import { PrismaClient, Summary, TaskType, Task, Status } from "@prisma/client";
import { error } from "console";
import { Router, Request, Response } from "express";
import { Server } from "socket.io";
const prisma = new PrismaClient
const MODEL = "google/gemini-2.0-flash-001"

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY || "";

interface OpenRouterResponse { 
    choices: Array<{ 
        message: { 
            role: string; 
            content: string; 
        }; 
    }>; 
}

const summaryRouter = (io: Server) => {
    const router = Router()
    router.get('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
        const summaries = await prisma.summary.findMany()
        res.status(200).json({ data: summaries })
    })
    router.post('/summary', async (req: Request, res: Response): Promise<any> => {

        try {
            // content is in post request, don't use external service
            const { content, transcriptionId, sourceId } = req.body as Summary
            if (!transcriptionId) {
                throw Error("transcriptionId must be provided")
            }

            const task: Task = await prisma.task.create({ data: { transcriptionId: transcriptionId, type: TaskType.SUMMARIZATION } });
            const summary: Summary = await prisma.summary.create({ data: { transcriptionId: transcriptionId, sourceId: sourceId } })
            if (!content) {
                // call external service
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${OPEN_ROUTER_API_KEY}`);

                const raw = JSON.stringify({
                    "model": `${MODEL}`,
                    "messages": [
                        {
                        "role": "user",
                        "content": "Quel est le sens de la vie ?"
                        }
                    ]
                });

                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("https://openrouter.ai/api/v1/chat/completions", requestOptions)
                .then(async (response) => {
                    if (response.ok) {
                        return await response.json();
                    } else {
                        throw error("there is problem with open router api");
                    }
                })
                .then(async (result: OpenRouterResponse) => {
                    console.info(result)

                    // TODO: iterate over choices instead of using choices[0]
                    await prisma.summary.update({
                        where: { id: summary.id },
                        data: { content: result.choices[0].message.content }
                    });
                    await prisma.task.update({
                        where: { id: task.id },
                        data: { status: Status.COMPLETED, finishedAt: new Date() }
                    });
                    console.log(result.choices)
                })
                .catch((error) => console.error(error));
            } else {
                // use content as summary
                const updateSummaryContent = async () => {
                    await prisma.summary.update({
                        where: { id: summary.id },
                        data: { content: content }
                    });
                    const taskstatus = await prisma.task.update({
                        where: { id: task.id },
                        data: { status: Status.COMPLETED, finishedAt: new Date() }
                    });
                    io.emit("task", taskstatus)
                }
                updateSummaryContent();
            }
            return res.status(201).json({ task: task })
        } catch (error: any) {
            // TODO: if there is errors, assign status.error to the task
            // TODO: also, it's possible to remove sourceid from the body by using transcription id to to retrieve the source
            return res.status(400).json({ error: "Internal Server Error", details: error.message });

        }
    })
    return router;
}

export default summaryRouter