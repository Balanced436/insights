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


app.post("/source", upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req: Request, res: Response) => {
  try {
    const { audio, video } = req.files as { audio: Express.Multer.File[], video: Express.Multer.File[] };
    const audioBuffer = audio[0].buffer;
    const videoBuffer = video[0].buffer;
  
    const source = await prisma.source.create({
      data: {
        title: 'title',
        description: 'description',
        video: videoBuffer,
        audio: audioBuffer,
      }
    })
    res.status(201).json({ message: 'Source created successfully', source })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.post("/source", upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req: Request, res: Response) => {
  try {
    // TODO
    const {title, description} = req.body as Source
    const { audio, video } = req.files as { audio: Express.Multer.File[], video: Express.Multer.File[] };
    const updatedData = {
      title: title ,
      description: description
    }
    const source: Source = await prisma.source.update({where : {id : parseInt(req.params.id) },data : {}})
    
  } catch (error) {
    
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is  at http://localhost:${port}`);
});