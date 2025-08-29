import app from "./app";
import { httpServer } from "./socket";
import logger from "./utils/logger";
const port = process.env.PORT || 4000;
const socketport = process.env.PORT || 4001;

app.listen(port, () => {
  logger.info(`[server]: Server is  at http://localhost:${port}`);
});
httpServer.listen(socketport, () => {
  logger.info(`[server]: Socket server is  at http://localhost:${socketport}`);
});
