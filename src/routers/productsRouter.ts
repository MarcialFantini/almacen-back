import { Router } from "express";
import {
  ProductCreateController,
  ProductGetOneByIdController,
  ProductGetPageController,
  ProductUpdateController,
} from "../controllers/ProductsController";
import { deletedUserController } from "../controllers/UsersController";

const productRouter = Router();

productRouter.post("/create", ProductCreateController);
productRouter.get("/one/:id", ProductGetOneByIdController);
productRouter.get("/page/:page/offset/:offset", ProductGetPageController);
productRouter.patch("/update/:id", ProductUpdateController);
productRouter.delete("/delete/:id", deletedUserController);

export { productRouter };
