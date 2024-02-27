// const ErrorHandler = require("./errorHandle");
import ErrorHandler from "./errorHandler";
const validationError = async (res, err, next) => {
  try {
    res.status(422).json({
      ok: false,
      status: 422,

      error: err,
    });
  } catch (e) {
    next(new ErrorHandler(String(e), 500));
  }
};

export default validationError;
