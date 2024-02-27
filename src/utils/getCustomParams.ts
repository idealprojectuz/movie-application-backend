import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./errorHandler";

export const getCustomParams = async (
  req: Request,
  res: Response,
  next: NextFunction,
  handle
) => {
  try {
    await handle(req, res, next);
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(String(error), error.status || 500));
  }
};
