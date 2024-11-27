import { PrismaClient, Source } from "@prisma/client";
import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs";

export const sourceRouter = Router();
const prisma = new PrismaClient();


sourceRouter.get("/source/:id?", async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id ? parseInt(req.params.id) : undefined;
    try {
      if (id === undefined || isNaN(id)) {
        const sources = await prisma.source.findMany();
        return res.status(200).json(sources);
      } else {
        const source = await prisma.source.findUnique({ where: { id: id } });
        if (source) {
          return res.status(200).json(source);
        } else {
          return res.status(404).json({ message: "Source not found" });
        }
      }
    } catch (error: any) {
      return res.status(500).json({ message: "Internal Server Error", detail: error.message });
    }
  });
  
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = file.fieldname === 'video' ? '/app/source/video' : '/app/source/audio'
      cb(null, path)
    },
    filename: function (req, file, cb) {
      const randomName = Date.now() + Math.round(Math.random() * 1E9)
      const extension = file.mimetype.split('/')[1]
      cb(null, `${randomName}.${extension}`)
    }
  })
  
  const sourceUpload = multer({ storage: storage })
  sourceRouter.post("/source", sourceUpload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req: Request, res: Response): Promise<any> => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } || {};
      const { title, description } = req.body as Source;
  
      if (!files['video'] || !files['audio']) {
        return res.status(400).json({ message: "Video and audio files are required" });
      }
  
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }
  
  
      const source = await prisma.source.create({
        data: {
          title: title,
          description: description,
          videoUrl: files['video'][0].path,
          audioUrl: files['audio'][0].path,
        }
      });
  
      return res.status(201).json({ message: 'Source created successfully', source });
    } catch (error: any) {
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
  
  sourceRouter.put("/source/:id", sourceUpload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
  
      const oldSource: Source = await prisma.source.findUnique({ where: { id: id } }) as Source;
      const oldSourceAudioUrl = oldSource.audioUrl;
      const oldSourceVideoUrl = oldSource.videoUrl;
  
      const { title, description } = req.body as Source;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } || {};
  
      const videoUrl = files['video'] && files['video'][0] ? files['video'][0].path : undefined;
      const audioUrl = files['audio'] && files['audio'][0] ? files['audio'][0].path : undefined;
  
      if (!title && !description && !videoUrl && !audioUrl){
        return res.status(400).json({ message: "No fields to update" });
      }
  
      const updatedData: Partial<Source> = {};
  
      if (title) updatedData.title = title;
      if (description) updatedData.description = description;
      if (videoUrl) updatedData.videoUrl = videoUrl;
      if (audioUrl) updatedData.audioUrl = audioUrl;
  
      console.info(`${new Date()}: Update source ${JSON.stringify(updatedData)}`)
      const updatedSource = await prisma.source.update({
        where: { id: id },
        data: updatedData,
      });
  
        if (audioUrl) {
          console.debug(`${new Date()}: Remove ${oldSourceAudioUrl}`)
          fs.unlinkSync(oldSourceAudioUrl);
        }
        if (videoUrl) {
          console.debug(`${new Date()}: Remove ${oldSourceVideoUrl}`)
          fs.unlinkSync(oldSourceVideoUrl);
        }
    
        return res.status(200).json({ message: "Source updated successfully", updatedSource });
  
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error", detail: error.message });
    }
  })
  
  sourceRouter.delete("/source/:id", async (req: Request, res: Response): Promise<any> => {
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

  export default sourceRouter