import { PrismaClient, Source, Transcription } from "@prisma/client";
import { Request, Response, Router } from "express";
import { uniqueId } from "lodash";
import fs from "fs"

const TranscriptionRouter = Router()
const prisma = new PrismaClient()

TranscriptionRouter.get("/transcription/:id?", async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id ? parseInt(req.params.id) : undefined;
    try {
        if (id === undefined) {
            const transcriptions = await prisma.transcription.findMany()
            return res.status(200).json({ data: transcriptions });
        } else if (isNaN(id)) {
            throw new Error("Invalid ID")
        } else {
            const transcription = await prisma.transcription.findUnique({
                where: {
                    id: id
                }
            })
            return res.status(200).json({ data: transcription });
        }
    } catch (error: any) {
        return res.status(400).json({ error: "Internal Server Error", details: error.message });
    }
})

TranscriptionRouter.post("/transcription", async (req: Request, res: Response): Promise<any> => {
    const sourceId = req.body.sourceId
    console.log("sourceId", sourceId)

    try {
        if (!sourceId) {
            throw new Error("sourceId is required")
        }

        // get source waw file
        const source: Source | null = await prisma.source.findUnique({ where: { id: sourceId } })
        if (!source) {
            throw Error("Source not found")
        }

        const audioFile: string | null = source.audioUrl
        if (!audioFile) {
            throw Error("Audio file not found")
        }

        console.log("audiofile", audioFile)


        const formData = new FormData();
        const file = await fs.openAsBlob(audioFile)

        formData.append("file", file, "file.wav");
        fetch("http://whisper-server:8080/inference", {
            method: "POST",
            body: formData
        })
            .then(resp => resp.ok ? resp.json() : Promise.reject(resp))


        const transcription: Transcription = await prisma.transcription.create({
            data: {
                sourceId: sourceId,
            }
        })
        const taskId = uniqueId()
        return res.status(201).json({ data: { sourceId: transcription.sourceId, taskId: taskId } });

    } catch (error: any) {
        return res.status(400).json({ error: "Internal Server Error", details: error.message });

    }
})

TranscriptionRouter.put("/transcription", async (req: Request, res: Response): Promise<any> => {
    return res.status(501).json({});
})

TranscriptionRouter.delete("/transcription/:id?", async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id ? parseInt(req.params.id) : undefined;
    try {
        if (id === undefined || isNaN(id)) {
            throw new Error("Invalid ID")
        } else {
            const deletedTranscription = await prisma.transcription.delete({ where: { id: id } })
            return res.status(201).json({ data: deletedTranscription });
        }
    } catch (error: any) {
        return res.status(400).json({ error: "Internal Server Error", details: error.message });
    }
})
export default TranscriptionRouter;

const createTranscription = (filename: String) => {


}