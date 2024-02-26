import { Router } from "express";
import {
  createOrdersController,
  deltedOrderController,
  getOderController,
  getOrderPageController,
  updateOrderController,
} from "../controllers/OrdersController";
const ordersRouter = Router();

ordersRouter.post("/create", createOrdersController);
ordersRouter.get("/one/:id", getOderController);
ordersRouter.get("/page/:page/offset/:offset", getOrderPageController);
ordersRouter.patch("/update/:id", updateOrderController);
ordersRouter.delete("/delete/:id", deltedOrderController);

export { ordersRouter };
