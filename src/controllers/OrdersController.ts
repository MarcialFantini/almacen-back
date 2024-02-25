import { NextFunction, Request } from "express";
import { OrdersInterface } from "../DB/models/Orders";

export const createOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order = req.body as OrdersInterface;

  const responseOrder = "";
};
