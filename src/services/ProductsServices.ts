import { Product, ProductInterface } from "../DB/models/Products";

export class ProductService {
  static async createProduct(product: ProductInterface) {
    const productCreted = await Product.create(product);

    if (!productCreted) {
      return {
        data: {},
        message: "not created",
        code: 500,
      };
    }

    return {
      data: productCreted,
      code: 201,
      message: "created",
    };
  }

  static async getProductById(id: string) {
    try {
      const product = await Product.findByPk(id);

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
