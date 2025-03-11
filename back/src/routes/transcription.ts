import { PrismaClient, Source, Status, Task, TaskType, Transcription } from "@prisma/client";
import { Request, Response, Router } from "express";
import { uniqueId } from "lodash";
import fs from "fs";
import { Server } from "socket.io";

const prisma = new PrismaClient();

const TranscriptionRouter = (io: Server) => {
  const router = Router();

  router.get("/transcription/:id?", async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id ? parseInt(req.params.id) : undefined;
    try {
      if (id === undefined) {
        const transcriptions = await prisma.transcription.findMany();
        return res.status(200).json({ data: transcriptions });
      } else if (isNaN(id)) {
        throw new Error("Invalid ID");
      } else {
        const transcription = await prisma.transcription.findUnique({
          where: {
            id: id
          }
        });
        return res.status(200).json({ data: transcription || {} });
      }
    } catch (error: any) {
      return res.status(400).json({ error: "Internal Server Error", details: error.message });
    }
  });

  router.post("/transcription", async (req: Request, res: Response): Promise<any> => {
    const sourceId = req.body.sourceId;

    const skipTranscription: boolean | undefined = req.body.skipTranscription

    try {
      if (!sourceId) {
        throw new Error("sourceId is required");
      }

      const source: Source | null = await prisma.source.findUnique({ where: { id: sourceId } });
      if (!source) {
        throw Error("Source not found");
      }

      const audioFile: string | null = source.audioUrl;
      if (!audioFile) {
        throw Error("Audio file not found");
      }
      const transcription: Transcription = await prisma.transcription.create({
        data: {
          sourceId: sourceId,
        }
      });

      const task: Task = await prisma.task.create({ data: { transcriptionId: transcription.id, type: TaskType.TRANSCRIPTION } });

      if (!skipTranscription) {
        const processTranscription = async () => {
          try {
            const audioFileBlob = await fs.promises.readFile(audioFile);
            const formData = new FormData();
            formData.append("file", new Blob([audioFileBlob]), "file.wav");

            const response = await fetch("http://whisper:8080/inference", {
              method: "POST",
              body: formData
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const res = await response.json();
            await prisma.transcription.update({
              where: { id: transcription.id },
              data: { content: JSON.stringify(res) }
            });
            await prisma.task.update({
              where: { id: task.id },
              data: { status: Status.COMPLETED, finishedAt: new Date() }
            });
          } catch (error) {
            // TODO catch this 
                        /* 2025-03-11 11:21:59 backend-1       | GET /task {}
            2025-03-11 11:22:56 backend-1       | Fetch error: TypeError: fetch failed
            2025-03-11 11:22:56 backend-1       |     at Object.fetch (node:internal/deps/undici/undici:11457:11) {
            2025-03-11 11:22:56 backend-1       |   cause: HeadersTimeoutError: Headers Timeout Error
            2025-03-11 11:22:56 backend-1       |       at Timeout.onParserTimeout [as callback] (node:internal/deps/undici/undici:9647:32)
            2025-03-11 11:22:56 backend-1       |       at Timeout.onTimeout [as _onTimeout] (node:internal/deps/undici/undici:7948:17)
            2025-03-11 11:22:56 backend-1       |       at listOnTimeout (node:internal/timers:573:17)
            2025-03-11 11:22:56 backend-1       |       at processTimers (node:internal/timers:514:7) {
            2025-03-11 11:22:56 backend-1       |     code: 'UND_ERR_HEADERS_TIMEOUT'
            2025-03-11 11:22:56 backend-1       |   }
            2025-03-11 11:22:56 backend-1       | } */
            console.error("Fetch error:", error);
            await prisma.task.update({
              where: { id: task.id },
              data: { status: Status.ERROR, finishedAt: new Date() }
            });
            

            throw error;
          }
        };
        processTranscription();
      } else {
        const fakeTranscription = async () => {
          console.info("skipTranscription is set to true");
          console.info("transcription.id", transcription.id);
          console.info("task.id", task.id);
          await prisma.transcription.update({
            where: { id: transcription.id },
            data: { content: "The flag skip transcription is set to true" }
          });
          await prisma.task.update({
            where: { id: task.id },
            data: { status: Status.COMPLETED, finishedAt: new Date() }
          });
        };
        fakeTranscription();
      }
      return res.status(201).json({ task: task });


    } catch (error: any) {
      return res.status(400).json({ error: "Internal Server Error", details: error.message });
    }
  });

  router.put("/transcription/:id?", async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id ? parseInt(req.params.id) : undefined;
    try {
      if (id === undefined) {
        throw Error("transcription id must be provide")
      }
      const { content } = req.body as Transcription

      if (!content) {
        throw Error("content must be provide")
      }
      const transcription = await prisma.transcription.update({ where: { id: id }, data: { content: content } })
      return res.status(201).json({ data: transcription })

    } catch (error: any) {
      return res.status(400).json({ error: "Internal Server Error", details: error.message });
    }
  });

  router.delete("/transcription/:id?", async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id ? parseInt(req.params.id) : undefined;
    try {
      if (id === undefined || isNaN(id)) {
        throw new Error("Invalid ID");
      }
      const transcription = await prisma.transcription.delete({
        where: {
          id: id
        }
      });
      return res.status(201).json({ data: transcription });
    } catch (error: any) {
      return res.status(400).json({ error: "Internal Server Error", details: error.message });
    }
  });

  return router;
};

export default TranscriptionRouter;