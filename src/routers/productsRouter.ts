import { Router } from "express";
import {
  ProductCreateController,
  ProductDeleteController,
  ProductGetOneByIdController,
  ProductGetPageController,
  ProductUpdateController,
} from "../controllers/ProductsController";
import { autAdmin } from "../middleware/aut";

const productRouter = Router();

productRouter.post("/create", autAdmin, ProductCreateController);
productRouter.get("/one/:id", ProductGetOneByIdController);
productRouter.get("/page/:page/offset/:offset", ProductGetPageController);
productRouter.patch("/update/:id", autAdmin, ProductUpdateController);
productRouter.delete("/delete/:id", autAdmin, ProductDeleteController);

export { productRouter };
