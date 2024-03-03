import { Express, Router } from "express";
import { usersRouter } from "./usersRouter";
import { productRouter } from "./productsRouter";
import { ordersRouter } from "./ordersRouter";
import { productImageRouter } from "./productImageRouter";
import { loginRouter } from "./loginRouter";

export const appRouter = (app: Express) => {
  const mainRouter = Router();
  const v1Router = Router();

  app.use("/api", mainRouter);

  mainRouter.use("/v1", v1Router);

  v1Router.use("/users", usersRouter);
  v1Router.use("/products/images", productImageRouter);
  v1Router.use("/products", productRouter);
  v1Router.use("/orders", ordersRouter);
  v1Router.use("/login", loginRouter);
};
