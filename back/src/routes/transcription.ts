import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const TranscriptionRouter = Router()
const prisma = new PrismaClient()

TranscriptionRouter.get("/transcription",async (req: Request, res:Response): Promise<any>=>{
    return res.status(200).json({});
})

TranscriptionRouter.post("/transcription",async (req: Request, res:Response): Promise<any>=>{
    return res.status(200).json({});
})

TranscriptionRouter.put("/transcription",async (req: Request, res:Response): Promise<any>=>{
    return res.status(200).json({});
})

TranscriptionRouter.delete("/transcription",async (req: Request, res:Response): Promise<any>=>{
    return res.status(200).json({});
})
export default TranscriptionRouter;
