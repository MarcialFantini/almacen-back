import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../DB/models/Users";

config();

const secret = process.env.secret_token || "hola";

export const autUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res
        .status(400)
        .json({ message: "error not send token", code: 400 });
    }

    const token = headerToken.split(" ")[1];

    const decode = verify(token, secret);

    if (typeof decode !== "string") {
      return res.status(400).json({ message: "bad request", code: 400 });
    }

    const user = await User.findByPk(decode, { attributes: ["role"] });

    if (!user) {
      return res.status(403).json({ message: "user not found", code: 403 });
    }

    if (user.dataValues.role !== "user") {
      return res.status(403).json({ code: 403, message: "token invalid" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ code: 500, message: error });
  }
};

export const autAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerToken = req.headers.authorization;

    console.log(req.body);

    if (!headerToken) {
      return res
        .status(400)
        .json({ message: "error not send token", code: 400 });
    }

    const token = headerToken.split(" ")[1];

    const decode = verify(token, secret) as { id: string };

    const user = await User.findByPk(decode.id, { attributes: ["role"] });

    if (!user) {
      return res.status(403).json({ message: "user not found", code: 403 });
    }

    if (user.dataValues.role !== "admin") {
      return res.status(403).json({ code: 403, message: "token invalid" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ code: 500, message: error });
  }
};
