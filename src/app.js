import express from "express";
import userRouter from "./router/user.js";
import logsRouter from "./router/log.js";


const app = express();

// json middleware
app.use(express.json());

// register router
app.use("/api/users", userRouter);
app.use("/api/logs", logsRouter);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({
        success: false,
        message,
        errors: err.errors || null
    });
});


export default app;