// const ErrorHandler = require("./errorHandle");
import ErrorHandler from "./errorHandler";

const succesResponse = async (res, data, next, count = null, status = 200) => {
  try {
    if (count) {
      count = Number(count);
    }
    const response = {
      ok: true,
      message: "Muvaffaqiyatli bajarildi",
      status: status,
      ...(count !== null && { count }),
      data,
    };
    res.status(status).json(response);
  } catch (e) {
    next(new ErrorHandler(String(e), 500));
  }
};

export default succesResponse;
