import { NextFunction, Request, Response } from "express";
import { OrdersInterface } from "../DB/models/Orders";
import { OrdersService } from "../services/OrdersServices";

export const createOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body as OrdersInterface;

    const responseOrder = await OrdersService.createOrder(order);

    res.status(responseOrder.code).json(responseOrder);
  } catch (error) {
    res.status(500).json({
      error,
      code: 500,
    });
  }
};

export const getOderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const responserOrder = await OrdersService.getOneOrder(id);

    res.status(responserOrder.code).json(responserOrder);
  } catch (error) {
    res.status(500).json({
      error,
      code: 500,
    });
  }
};
export const getOrderPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.params.page);
    const offset = Number(req.params.offset);

    const responserOrder = await OrdersService.getPageOrder(page, offset);

    res.status(responserOrder.code).json(responserOrder);
  } catch (error) {}
};

export const updateOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updateOrder = req.body as OrdersInterface;

    const responseOrder = await OrdersService.updateOrder(id, updateOrder);

    res.status(responseOrder.code).json(responseOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deltedOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const responserOder = await OrdersService.deleteOrder(id);

    res.status(responserOder.code).json(responserOder);
  } catch (error) {
    res.status(500).json(error);
  }
};
