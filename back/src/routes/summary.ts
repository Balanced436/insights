import { PrismaClient, Summary, TaskType, Task, Status, Transcription } from "@prisma/client";
import { error } from "console";
import { Router, Request, Response } from "express";
import { Server } from "socket.io";
import { OR_COMPLETION_ENDPOINT, OR_DEFAULT_MODEL, OR_DEFAULT_SUMMARIZATION_PROMPT, OpenRouterResponse } from "../models/openrouter.model";
const prisma = new PrismaClient

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY || "";


const summaryRouter = (io: Server) => {
    const router = Router()
    router.get('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id ? parseInt(req.params.id) : undefined;
        try {
            if (id === undefined){
                const summaries = await prisma.summary.findMany()
                res.status(200).json({ data: summaries })
    
            }else if(isNaN(id)){
                return res.status(400).json({ message: "Invalid ID" });
    
            }else{
                const summary = await prisma.summary.findUnique({where : {id: id}})
                if (summary){
                    res.status(200).json(summary)
                }else{
                    return res.status(404).json({ message: "Source not found" });
                }
            }    
        } catch (error:any) {
            return res
                .status(500)
                .json({ message: "Internal Server Error", detail: error.message });

        }
    })
    router.post('/summary', async (req: Request, res: Response): Promise<any> => {

        try {
            // content is in post request, don't use external service
            const { content, transcriptionId } = req.body as Summary
            if (!transcriptionId) {
                throw Error("transcriptionId must be provided")
            }
            const transcription: Transcription|null = await prisma.transcription.findUnique({where : {id: transcriptionId}})

            if (!transcription){
                throw Error("No transcription found")
            }
            

            const task: Task = await prisma.task.create({ data: { transcriptionId: transcriptionId, type: TaskType.SUMMARIZATION } });
            const summary: Summary = await prisma.summary.create({ data: { transcriptionId: transcriptionId } })
            if (!content) {
                // call external service
                const transcription = await prisma.transcription.findUnique({ where: { id: transcriptionId } });
                if (!transcription) {
                    throw new Error("Transcription not found");
                }
                transcription.content
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${OPEN_ROUTER_API_KEY}`);

                const raw = JSON.stringify({
                    "model": `${OR_DEFAULT_MODEL}`,
                    "messages": [
                        {
                        "role": "user",
                        "content": `${OR_DEFAULT_SUMMARIZATION_PROMPT}: ${transcription.content}`
                        }
                    ]
                });

                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch(OR_COMPLETION_ENDPOINT, requestOptions)
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

    router.put('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id ? parseInt(req.params.id) : undefined;
        try {
            if (!id){
                throw Error("id must be provided")
            }
            if (isNaN(id)){
                throw Error("id must be a number")
            }

            const summary: Summary | null = await prisma.summary.findUnique({where : {id : id}})
            if (!summary){
                throw Error("no summary found with this id")
            }
            
        } catch (error: any) {
            return res.status(400).json({ error: "Internal Server Error", details: error.message });  
            
        }
        return res.status(500).json({ error: "not implemented yet"});
    })

    router.delete('/summary/:id?', async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id ? parseInt(req.params.id) : undefined;
        try {
            if (id){
                // delete this shit
                const deleteSummary = await prisma.summary.delete({where : {id:id}})
                    return res.status(201).json(deleteSummary);
                
            }else{
                // throw this shit
                throw Error("summary id must be provided")
            }
        } catch (error:any) {
            return res.status(400).json({ error: "Internal Server Error", details: error.message });
            
        }


    })

    return router;
}

export default summaryRouter