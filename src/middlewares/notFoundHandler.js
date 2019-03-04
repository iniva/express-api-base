const STATUS_CODE = 404;

const notFoundHandler = (req, res) => res
  .status(STATUS_CODE)
  .json({
    errorCode: STATUS_CODE,
    message: 'Resource not found',
  });

export default notFoundHandler;
