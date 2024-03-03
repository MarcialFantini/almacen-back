import { NextFunction, Request, Response } from "express";

import { ProductImagesServices } from "../services/ProductsImagesService";

export const createProductImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const destination = req.file?.path;
    console.log(req.file);
    if (!destination || !id) {
      return res.status(400).json({
        code: 400,
        message: "bad request",
      });
    }

    //id = id of Product
    const newResponse = await ProductImagesServices.createImage(
      id,
      destination
    );

    res.status(newResponse.code).json(newResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOneImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const image = await ProductImagesServices.getOneImage(id);
    console.log(image);
    res.status(200).sendFile(image);
  } catch (error) {
    res.status(500).json(error);
  }
};
