import { Request, Response, NextFunction } from "express";
import succesResponse from "../../utils/successResponse";
import { getCustomParams } from "../../utils/getCustomParams";

const GET = async (req: Request, res: Response, next: NextFunction) => {
  return succesResponse(res, null, next);
};

export default {
  GET: async (req: Request, res: Response, next: NextFunction) => {
    return getCustomParams(req, res, next, GET);
  },
};
