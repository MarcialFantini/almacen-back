import { NextFunction, Request, Response } from "express";
import { ProductInterface } from "../DB/models/Products";
import { ProductService } from "../services/ProductsServices";

export const ProductCreateWithImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("hola");
    const product = req.body as ProductInterface;
    if (!product) {
      res.status(400).json({ message: "error to send product in body" });
    }
    let pathFiles: string[] = [];

    if (req.files) {
      for (const file of req.files as Express.Multer.File[]) {
        pathFiles.push(file.path);
      }
    }

    const responseProduct = await ProductService.createProductWithImages(
      product,
      pathFiles
    );

    res.status(responseProduct.code).json(responseProduct);
  } catch (error) {
    res.status(500).json({ message: "error to created product" });
  }
};

export const ProductCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body as ProductInterface;
    console.table(product);
    const responseProduct = await ProductService.createProduct(product);

    res.status(responseProduct.code).json(responseProduct);
  } catch (error) {
    res.status(500).json({ message: error, code: 500, data: {} });
  }
};

export const ProductGetSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.params;

    if (!search) {
      return res
        .status(400)
        .json({ data: {}, message: "error to send search", code: 400 });
    }

    const productsResponse = await ProductService.getSearchProduct(search);

    res.status(productsResponse.code).json(productsResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ProductGetOneByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const productResponse = await ProductService.getProductById(id);

    res.status(productResponse.code).json(productResponse);
  } catch (error) {
    res.status(500).json({ message: error, code: 500, data: {} });
  }
};

export const ProductGetPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.params.page);
    const offset = Number(req.params.offset);
    const category = req.params.category;

    const responsePage = await ProductService.getproductPage(
      page,
      offset,
      category
    );

    res.status(responsePage.code).json(responsePage);
  } catch (error) {
    res.status(500).json({ message: error, code: 500, data: {} });
  }
};

export const ProductUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const productBody = req.body as ProductInterface;

    const responseProductUpdate = await ProductService.updateProduct(
      id,
      productBody
    );

    res.status(responseProductUpdate.code).json(responseProductUpdate);
  } catch (error) {
    res.status(500).json({
      message: error,
      code: 500,
      data: {},
    });
  }
};

export const ProductDeleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const responseProduct = await ProductService.deletedProduct(id);

    res.status(responseProduct.code).json(responseProduct);
  } catch (error) {
    res.status(500).json({
      data: {},
      code: 500,
      message: error,
    });
  }
};
