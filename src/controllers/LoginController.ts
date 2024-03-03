import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export interface login {
  email: string;
  password: string;
}

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as login;

    if (!email || !password) {
      return res.status(400).json({ message: "bad request", code: 400 });
    }

    const responseLogin = await LoginService.loginUser(email, password);

    res.status(responseLogin.code).json(responseLogin);
  } catch (error: any) {
    res.status(500).json({ message: error, code: 500 });
  }
};
