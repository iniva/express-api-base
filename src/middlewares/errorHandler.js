const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const errorCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res
        .status(errorCode)
        .json({
            errorCode,
            message
        });
};

export default errorHandler;
