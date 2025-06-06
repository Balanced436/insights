import express, { Express, Request } from "express";
import morgan from 'morgan';
import sourceRouter from "./routes/sources";
import TranscriptionRouter from "./routes/transcription";
const app: Express = express();
import cors from 'cors';
import { io } from "./socket";
import TaskRouter from "./routes/task";
import summaryRouter from "./routes/summary";
import loginRouter  from "./routes/login";
import userRouter from "./routes/user";
import corpusRouter from "./routes/corpus";

app.use(cors());
app.use(express.json());
//app.use(morgan('combined'))
morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body)
})

/* app.use(morgan(':method :url :body')) */
app.use(express.urlencoded({ extended: true }));
app.use('/',sourceRouter)
app.use('/',TranscriptionRouter(io))
app.use('/',TaskRouter(io))
app.use('/',summaryRouter(io))
app.use('/',loginRouter)
app.use('/',userRouter)
app.use('/',corpusRouter)

export default app;