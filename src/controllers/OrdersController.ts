import { NextFunction, Request, Response } from "express";
import { OrdersInterface } from "../DB/models/Orders";
import {
  CreateOrderInterface,
  OrdersService,
} from "../services/OrdersServices";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const secret = process.env.secret_token || "hola";

export const createOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body.order as CreateOrderInterface[];
    const Authorization = req.headers.authorization;
    if (!Authorization) {
      return res.status(500).json({ message: "error to send token" });
    }

    const token = Authorization.split(" ")[1];
    let tokenId = "";

    const decode: any = verify(token, secret);

    if (decode.id) {
      tokenId = decode.id;
    }

    const responseOrder = await OrdersService.createOrder(order, tokenId);

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
    console.log("id del order: ", id);
    const responserOder = await OrdersService.deleteOrder(id);

    res.status(responserOder.code).json(responserOder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getInfoGraphOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseOrder = await OrdersService.getInfoGraphOrders();

    if (responseOrder.length <= 0) {
      return res.status(404).json({
        code: 404,
        message: "error to found orders",
        data: { orders: [] },
      });
    }

    res
      .status(200)
      .json({
        code: 200,
        message: "orders found",
        data: { orders: responseOrder },
      });
  } catch (error) {
    res.status(500).json({ code: 500, message: error, data: {} });
  }
};
