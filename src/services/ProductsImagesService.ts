import createHttpError from "http-errors";
import {
  ProductImages,
  ProductImagesInterfaces,
} from "../DB/models/ProductImages";
import path from "path";

export class ProductImagesServices {
  static async createImage(product_id: string, src_image: string) {
    const image = await ProductImages.create({ product_id, src_image });

    return {
      data: image,
      message: "image created",
      code: 201,
    };
  }

  static async getOneImage(id: string) {
    const image = await ProductImages.findByPk(id);
    if (!image) {
      throw new Error("image not found");
    }

    const pathNow = path.resolve();

    const pathSrcImage = path.join(pathNow, image.dataValues.src_image);

    return pathSrcImage;
  }
}
