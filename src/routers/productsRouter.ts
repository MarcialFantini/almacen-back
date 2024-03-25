import { Router } from "express";
import {
  GetCountCategoryProductsController,
  ProductCreateController,
  ProductCreateWithImageController,
  ProductDeleteController,
  ProductGetOneByIdController,
  ProductGetPageController,
  ProductGetSearch,
  ProductUpdateController,
} from "../controllers/ProductsController";
import { autAdmin } from "../middleware/aut";
import { upload } from "../middleware/multer";

const productRouter = Router();
productRouter.post(
  "/create/image",
  upload.array("images"),
  autAdmin,

  ProductCreateWithImageController
);
productRouter.post("/create", autAdmin, ProductCreateController);
productRouter.get("/one/:id", ProductGetOneByIdController);
productRouter.get(
  "/page/:page/offset/:offset/:category?",
  ProductGetPageController
);
productRouter.get("/search/:search", ProductGetSearch);
productRouter.get(
  "/dashboard/category/count",
  GetCountCategoryProductsController
);
productRouter.patch("/update/:id", autAdmin, ProductUpdateController);
productRouter.delete("/delete/:id", autAdmin, ProductDeleteController);

export { productRouter };
