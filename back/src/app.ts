import express, { Express, Request } from "express";
import morgan from 'morgan';
import sourceRouter from "./routes/sources";
import TranscriptionRouter from "./routes/transcription";
import cors from 'cors';
import { io } from "./socket";
import TaskRouter from "./routes/task";
import summaryRouter from "./routes/summary";
import loginRouter from "./routes/login";
import userRouter from "./routes/user";
import corpusRouter from "./routes/corpus";
import logger from "./utils/logger";

const app: Express = express();
app.use(cors());
app.use(express.json());
morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body)
})

morgan.token('datetime', (req: Request) => new Date().toLocaleString())


app.use(morgan(':method :url :status :response-time ms Body: :body',
  { stream: { write: msg => logger.info(msg.trim()) } }));
app.use(express.urlencoded({ extended: true }));
app.use('/', sourceRouter)
app.use('/', TranscriptionRouter(io))
app.use('/', TaskRouter(io))
app.use('/', summaryRouter(io))
app.use('/', loginRouter)
app.use('/', userRouter)
app.use('/', corpusRouter)


export default app;