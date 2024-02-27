import { Request, Response, NextFunction } from "express";
import { getCustomParams } from "../../utils/getCustomParams";
import { User } from "../../entity/users.entity";
import { AppDataSource } from "../../config/ormconfig";
import { validate } from "class-validator";
import validationError from "../../utils/validationError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import succesResponse from "../../utils/successResponse";
import { createClient } from "redis";
import ErrorHandler from "../../utils/errorHandler";
import { v4 as uuid } from "uuid";
import { sendCode } from "../../utils/sendmail";
const userRepo = AppDataSource.getRepository(User);
const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, email, password } = req.body;
  const user = new User();
  user.firstName = firstName;
  user.email = email;
  user.password = password;
  const errors = await validate(user);
  if (errors.length > 0) {
    return validationError(res, errors, next);
  }
  user.password = await bcrypt.hash(user.password, 10);

  const data = userRepo.create(user);
  const newuser = await userRepo.save(data);
  delete newuser.password;
  const token = await jwt.sign(
    {
      user: newuser.id,
      role: newuser.role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "31d",
    }
  );
  return succesResponse(
    res,
    {
      token,
      ...newuser,
    },
    next
  );
};
const check = async (req, res, next) => {
  const client = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  })
    .on("error", (err) => console.log(err))
    .connect();

  try {
    const { id, status, email } = req.user;
    if (status) {
      return next(new ErrorHandler("user status already activated ", 404));
    }
    // const key = uuid();
    const newemail = await sendCode(email);
    const data = await client.setEx(String(id), 80, String(newemail.code));

    // console.log(data);
    let response = {
      expires: 60,
    };
    return succesResponse(res, response, next);
  } finally {
    await client.disconnect();
  }
};
const verify = async (req, res, next) => {
  const { id } = req.user;
  const { code } = req.body;
  if (!code) {
    throw new ErrorHandler("code required", 422);
  }
  const client = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  })
    .on("error", (err) => console.log(err))
    .connect();

  try {
    const savedKey = await client.get(String(id));
    if (savedKey == code) {
      const data = await userRepo.findOneBy({
        id: id,
      });
      if (!data) {
        throw new ErrorHandler("user not found", 404);
      }
      data.status = true;
      const response = await userRepo.manager.save(data);
      delete response.password;
      return succesResponse(res, response, next);
    }
  } finally {
  }
};
// const LOGIN;
export default {
  register: async (req, res, next) => {
    return getCustomParams(req, res, next, register);
  },
  check: async (req, res, next) => {
    return getCustomParams(req, res, next, check);
  },
  verify: async (req, res, next) => {
    return getCustomParams(req, res, next, verify);
  },
};
