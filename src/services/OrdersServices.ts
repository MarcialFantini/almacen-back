import { Model, where } from "sequelize";
import { sequelize } from "../DB/connection";
import { Orders, OrdersInterface } from "../DB/models/Orders";
import { Product, ProductInterface } from "../DB/models/Products";
import { User } from "../DB/models/Users";

export class OrdersService {
  static async createOrder(order: OrdersInterface) {
    const t = await sequelize.transaction();

    try {
      const productSelected = await Product.findOne({
        where: { id: order.product_id },
        attributes: ["amount"],
        transaction: t, // Pass the transaction to all queries
      });
      const userSelected = await User.findOne({
        where: { id: order.user_id },
        attributes: ["id"],
        transaction: t, // Pass the transaction to all queries
      });

      if (!productSelected || !userSelected) {
        return {
          data: {},
          message: "product or user not found",
          code: 404,
        };
      }

      const amountLessProduct =
        productSelected.dataValues.amount - order.amount;

      if (amountLessProduct < 0) {
        await t.rollback();
        return {
          data: {},
          message: "not amount required",
          code: 400,
        };
      }

      await Product.update(
        { amount: amountLessProduct },
        { where: { id: order.product_id }, transaction: t }
      );

      const newOrder = await Orders.create(order, { transaction: t });

      if (!newOrder) {
        await t.rollback();
        throw new Error("Error to create order");
      }

      await t.commit();

      return {
        data: newOrder,
        message: "order created",
        code: 200,
      };
    } catch (error) {
      await t.rollback();

      return {
        data: error,
        code: 500,
      };
    }
  }

  static async getOneOrder(id: string) {
    const order = await Orders.findByPk(id, {
      include: [
        { model: Product, attributes: ["name", "price"] },
        { model: User, attributes: ["name", "email"] },
      ],
    });

    if (!order) {
      return {
        data: {},
        message: "not found order",
        code: 404,
      };
    }
    return {
      data: order,
      message: "found order",
      code: 200,
    };
  }

  static async getPageOrder(page: number, offset: number) {
    const pageOrder = await Orders.findAll({
      limit: offset,
      offset: offset * page,
      attributes: ["id", "amount"],
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Product, attributes: ["name", "price"] },
      ],
    });

    if (pageOrder.length <= 0) {
      return {
        code: 404,
        message: "orders not found",
        data: {},
      };
    }
    return {
      code: 200,
      message: "orders found",
      data: pageOrder,
    };
  }

  static async updateOrder(id: string, updateOrder: OrdersInterface) {
    const t = await sequelize.transaction();
    try {
      const order = await Orders.findByPk(id, { transaction: t });
      if (!order) {
        throw new Error("order not found");
      }
      const product = await Product.findByPk(order.dataValues.product_id);
      if (!product) {
        throw new Error("product not found");
      }

      if (updateOrder.amount && order.dataValues.amount > updateOrder.amount) {
        const diff = order.dataValues.amount - updateOrder.amount;
        await Product.update(
          { amount: product.dataValues.amount + diff },
          { where: { id: order.dataValues.product_id }, transaction: t }
        );
      }
      if (updateOrder.amount && order.dataValues.amount < updateOrder.amount) {
        const diff = updateOrder.amount - order.dataValues.amount;
        if (product.dataValues.amount >= diff) {
          await Product.update(
            { amount: product.dataValues.amount - diff },
            { where: { id: order.dataValues.product_id }, transaction: t }
          );
        }
        if (product.dataValues.amount < diff) {
          throw new Error("error: not amount ");
        }
      }

      await Orders.update(updateOrder, { where: { id }, transaction: t });

      await t.commit();

      return {
        code: 200,
        message: "order updated ",
        data: {},
      };
    } catch (error: any) {
      console.log(error);
      await t.rollback();
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async deleteOrder(id: string) {
    const t = await sequelize.transaction();
    try {
      const order = await Orders.findByPk(id, {
        attributes: ["amount", "product_id"],
      });

      if (!order) {
        throw new Error("error to found oder");
      }

      if (!order.dataValues.isCompleted) {
        const product = await Product.findByPk(order.dataValues.product_id, {
          attributes: ["amount"],
        });

        if (!product) {
          throw new Error("error to found product");
        }

        await Product.update(
          { amount: product.dataValues.amount + order.dataValues.amount },
          {
            where: { id: order.dataValues.amount + product.dataValues.amount },
            transaction: t,
          }
        );
      }

      const ordersUpdate = await Orders.update(
        { isDeleted: true },
        { where: { id }, transaction: t }
      );

      if (ordersUpdate[0] <= 0) {
        return {
          data: {},
          message: "order deleted",
          code: 400,
        };
      }

      return { data: ordersUpdate, message: "order deleted", code: 200 };
    } catch (error: any) {
      await t.rollback();

      return {
        data: error.message || error,
        code: 500,
      };
    }
  }
}
