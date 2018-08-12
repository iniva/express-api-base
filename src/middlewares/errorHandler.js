import Boom from 'boom';

const DEFAULT_STATUS_CODE = 500;
const DEFAULT_ERROR_MESSAGE = 'Internal Server Error';
const LOG_ERRORS = process.env.LOG_ERRORS || '400,500';

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (!err.isBoom) {
        Boom.boomify(err);
    }

    const { statusCode = DEFAULT_STATUS_CODE, payload: details } = err.output;
    const message = err.message || DEFAULT_ERROR_MESSAGE;
    const response = {
        statusCode,
        message,
        details
    };

    if (LOG_ERRORS.split(',').includes(String(statusCode))) {
        req.log.error(err);
    }

    if (process.env.NODE_ENV === 'production') {
        delete response.details;
    }

    return res
        .status(statusCode)
        .json(response);
};

export default errorHandler;
