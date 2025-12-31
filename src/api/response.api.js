class ApiResponse {
    constructor(statusCode = 200, message = "OK", data = null) {
        this.success = statusCode >= 200 && statusCode < 400;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse }