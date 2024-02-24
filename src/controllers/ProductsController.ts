import { NextFunction, Request, Response } from "express";
import { ProductInterface } from "../DB/models/Products";
import { ProductService } from "../services/ProductsServices";

export const ProductCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body as ProductInterface;

    const responseProduct = await ProductService.createProduct(product);

    res.status(responseProduct.code).json(responseProduct);
  } catch (error) {
    res.status(500).json({ message: error, code: 500, data: {} });
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

    const responsePage = await ProductService.getproductPage(page, offset);

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
