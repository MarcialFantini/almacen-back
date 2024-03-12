import { Router } from "express";
import {
  createProductImageController,
  getOneImageController,
} from "../controllers/ProductImageController";
import { upload } from "../middleware/multer";
import { autAdmin } from "../middleware/aut";

const productImageRouter = Router();

productImageRouter.post(
  "/create/:id",
  upload.single("image"),
  autAdmin,

  createProductImageController
);
productImageRouter.get("/one/:id", getOneImageController);
productImageRouter.get("/page/:page/offset/:offset");
productImageRouter.patch("/one/:id", autAdmin);
productImageRouter.delete("/delete/:id", autAdmin);

export { productImageRouter };
