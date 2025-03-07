import app from "./app";
import { httpServer,io } from "./socket";
const port = process.env.PORT || 4000;
const socketport = process.env.PORT || 4001;


app.listen(port,()=>{
  console.log(`[server]: Server is  at http://localhost:${port}`);
})
httpServer.listen(socketport,()=>{
  console.log(`[server]: Socket server is  at http://localhost:${socketport}`);
})