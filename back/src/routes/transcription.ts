import { PrismaClient, Transcription } from "@prisma/client";
import { Request, Response, Router } from "express";
import { uniqueId } from "lodash";

const TranscriptionRouter = Router()
const prisma = new PrismaClient()

TranscriptionRouter.get("/transcription/id",async (req: Request, res:Response): Promise<any>=>{
    return res.status(501).json({});
})

TranscriptionRouter.post("/transcription",async (req: Request, res:Response): Promise<any>=>{
    const sourceId = req.body.sourceId
    console.log("sourceId", sourceId)

    try {
        if (!sourceId){
            throw new Error("sourceId is required")
        }
        const transcription : Transcription = await prisma.transcription.create({
            data: {
                sourceId: sourceId,
            }
        })
        const taskId = uniqueId()
        return res.status(201).json({data: {sourceId: transcription.sourceId, taskId: taskId}});
        
    } catch (error:any) {
        return res.status(400).json({error: "Internal Server Error", details: error.message});
        
    }
})

TranscriptionRouter.put("/transcription",async (req: Request, res:Response): Promise<any>=>{
    return res.status(501).json({});
})

TranscriptionRouter.delete("/transcription",async (req: Request, res:Response): Promise<any>=>{
    return res.status(501).json({});
})
export default TranscriptionRouter;
