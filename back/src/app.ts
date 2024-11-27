import express, { Express, Request } from "express";
import morgan from 'morgan';
import sourceRouter from "./routes/sources";

const app: Express = express();

app.use(express.json());
app.use(morgan('combined'))
morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))
app.use(express.urlencoded({ extended: true }));
app.use('/',sourceRouter)

export default app;