import { Router } from "express";
const ordersRouter = Router();

ordersRouter.post("/create");
ordersRouter.get("/one/:id");
ordersRouter.get("/page/:page/offset/:offset");
ordersRouter.patch("/update/:id");
ordersRouter.delete("/delete/:id");

export { ordersRouter };
