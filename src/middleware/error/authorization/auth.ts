import jwt from "jsonwebtoken";
import ErrorHandler from "../../../utils/errorHandler";
import { User } from "../../../entity/users.entity";
import { AppDataSource } from "../../../config/ormconfig";

const userRepo = AppDataSource.getRepository(User);
export const isLogin = (roles = ["admin", "user"], status = true) => {
  return async (req, res, next) => {
    try {
      const token =
        req.headers?.authorization?.split(" ")?.[1] || req.query.token || null;
      // console.log(token);

      const tokendata: any = await jwt.verify(token, process.env.SECRET_KEY);
      if (token && tokendata) {
        const user = await userRepo.findOne({
          where: {
            id: tokendata.id,
          },
        });
        if (user) {
          if (status) {
            if (!user.status) {
              throw new ErrorHandler("your are not verified", 403);
            }
          }
          if (roles.includes(user.role)) {
            req.user = user;
            return next();
          }
          throw new ErrorHandler("your role is not allowed", 403);
        }
        throw new ErrorHandler("login yoki parol xato", 403);
      }
    } catch (error) {
      next(new ErrorHandler(error.message, error.status || 403));
    }
  };
};
