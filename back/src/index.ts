import express, { Express, Request, Response } from "express";
import { PrismaClient, Source } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT || 4000;
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express");
});

app.get("/source", async (req: Request, res: Response) => {
  const sources = await prisma.source.findMany()
  res.status(200).json(sources);
});


app.post("/source", upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req: Request, res: Response): Promise<any> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const {title, description } = req.body as Source

    if (!files['video'] || !files['audio']) {
      return res.status(400).json({ message: "Video and audio files are required" });
    }

    if(!title || !description){
      return res.status(400).json({ message: "Title and description are required" });
    }
  
    const videoBuffer = files['video'][0].buffer
    const audioBuffer = files['audio'][0].buffer
  
    const source = await prisma.source.create({
      data: {
        title: title,
        description: description,
        video: videoBuffer,
        audio: audioBuffer,
      }
    })
    return res.status(201).json({ message: 'Source created successfully', source })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.put("/source/:id", upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }


    const { title, description } = req.body as Source;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const videoBuffer = files && files['video'] ? files['video'][0].buffer : undefined;
    const audioBuffer = files && files['audio'] ? files['audio'][0].buffer : undefined;

    if (!title && !description && !videoBuffer && !audioBuffer){
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedData: Partial<Source> = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (videoBuffer) updatedData.video = videoBuffer;
    if (audioBuffer) updatedData.audio = audioBuffer;
      const updatedSource = await prisma.source.update({
        where: { id: id },
        data: updatedData,
      });
  
      return res.status(200).json({ message: "Source updated successfully", updatedSource });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", detail: error.message });
  }
})

app.delete("/source/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await prisma.source.delete({ where: { id: id } });

    return res.status(200).json({ message: "Source deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", detail: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is  at http://localhost:${port}`);
});