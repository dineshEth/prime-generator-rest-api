import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addLogHandler, getAllLogsHandler, getLogsByUserIdHandler, getAllStrategiesHandler } from "../controllers/log.js";



const logsRouter = Router();

// insert log
logsRouter.post("/insert", auth, addLogHandler)
// get all logs
logsRouter.get("/all", auth, getAllLogsHandler)
// get user's logs by user id
logsRouter.get("/user", auth, getLogsByUserIdHandler)
// get all strategies
logsRouter.get("/strategies", auth, getAllStrategiesHandler)

// protected route example


export default logsRouter;