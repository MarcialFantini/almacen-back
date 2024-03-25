import { Router } from "express";
import {
  createOrdersController,
  deltedOrderController,
  getInfoGraphOrdersController,
  getOderController,
  getOrderPageController,
  updateOrderController,
} from "../controllers/OrdersController";
const ordersRouter = Router();

ordersRouter.post("/create", createOrdersController);
ordersRouter.get("/graphic", getInfoGraphOrdersController);
ordersRouter.get("/one/:id", getOderController);
ordersRouter.get("/page/:page/offset/:offset", getOrderPageController);
ordersRouter.patch("/update/:id", updateOrderController);
ordersRouter.delete("/delete/:id", deltedOrderController);

export { ordersRouter };
