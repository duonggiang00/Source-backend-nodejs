const createError = (statusCode, Message) => {
    const error = new Error(Message || "Internal Server Error");
    error.statusCode = statusCode || 500;
    return error;
}
export default createError