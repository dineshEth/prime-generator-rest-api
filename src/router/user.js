import { Router } from "express";
import { login, signup } from "../controllers/user.js";

const userRouter = Router();

// Api Endpoints
userRouter.post("/signup", signup);
userRouter.post("/login", login);


export default userRouter;