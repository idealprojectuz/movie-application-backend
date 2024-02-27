const ErrorHandler = (err, _, res, __) => {
  return res.status(err.status).json({
    ok: false,
    message: err.message,
    status: err.status,
  });
};

export default ErrorHandler;
