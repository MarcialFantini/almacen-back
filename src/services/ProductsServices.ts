import { ProductImages } from "../DB/models/ProductImages";
import { Product, ProductInterface } from "../DB/models/Products";

export class ProductService {
  static async createProductWithImages(
    product: ProductInterface,
    files: string[]
  ) {
    const productCreated = await Product.create(product, { returning: true });

    if (!productCreated) {
      return { data: {}, message: "not created", code: 500 };
    }

    const idProductCreated = productCreated.dataValues.id;

    const promises = files.map((file) => {
      return ProductImages.create({
        product_id: idProductCreated,
        src_image: file,
      });
    });

    const allCreated = await Promise.allSettled(promises);

    return { data: {}, message: "product and images created", code: 201 };
  }

  static async createProduct(product: ProductInterface) {
    const productCreated = await Product.create(product);

    if (!productCreated) {
      return {
        data: {},
        message: "not created",
        code: 500,
      };
    }

    return {
      data: productCreated,
      code: 201,
      message: "created",
    };
  }

  static async getProductById(id: string) {
    try {
      const product = await Product.findByPk(id, {
        include: { model: ProductImages, attributes: ["id"] },
      });

      if (!product) {
        return {
          data: {},
          message: "not found",
          code: 404,
        };
      }

      return {
        data: product,
        message: "product found",
        code: 200,
      };
    } catch (error) {
      return {
        data: {},
        message: error,
        code: 404,
      };
    }
  }

  static async getproductPage(page: number, offset: number) {
    const listOfProducts = await Product.findAll({
      limit: offset,
      offset: offset * page,
      attributes: ["id", "name", "amount", "price"],
      include: { model: ProductImages, attributes: ["id"] },
    });
    if (listOfProducts.length === 0) {
      return {
        data: [],
        message: "not found products",
        code: 404,
      };
    }

    return {
      data: listOfProducts,
      message: "products found",
      code: 200,
    };
  }

  static async updateProduct(id: string, productToUpdate: ProductInterface) {
    try {
      const productUpdated = await Product.update(productToUpdate, {
        where: {
          id,
        },
      });

      if (!productUpdated) {
        return {
          message: "product not found",
          code: 404,
          data: {},
        };
      }

      return {
        data: productToUpdate,
        code: 200,
        message: "product updated",
      };
    } catch (error) {
      return {
        message: error,
        code: 500,
        data: {},
      };
    }
  }

  static async deletedProduct(id: string) {
    try {
      const productToDelete = await Product.update(
        { isDeleted: true },
        {
          where: {
            id,
          },
        }
      );

      if (!productToDelete) {
        return {
          message: "product not found",
          data: {},
          code: 404,
        };
      }

      return {
        message: "produc deleted",
        data: {},
        code: 200,
      };
    } catch (error) {
      return {
        message: error,
        data: {},
        code: 500,
      };
    }
  }
}
