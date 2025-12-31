class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = "Something went wrong",
        errors = null
    ) {
        super(message);

        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.errors = errors; // optional: validation / field errors
        this.name = "ApiError";

        Error.captureStackTrace(this, this.constructor);
    }
}

export { ApiError }