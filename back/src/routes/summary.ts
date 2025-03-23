import { PrismaClient, Summary, TaskType, Task, Status } from "@prisma/client";
import { Router, Request, Response, response } from "express";
import { Server } from "socket.io";
const prisma = new PrismaClient

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
            // if there is errors, assign status.error to the task
            // also, it's possible to remove sourceid from the body by using transcription id to to retrieve the source
            return res.status(400).json({ error: "Internal Server Error", details: error.message });

        }
    })
    return router;
}

export default summaryRouter