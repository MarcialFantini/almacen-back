import { Orders, OrdersInterface } from "../DB/models/Orders";

export class OrdersService {
  static async createOrder(order: OrdersInterface) {
    const newOrder = await Orders.create(order);

    if (!newOrder) {
      return {
        data: {},
        message: "error to created order",
        code: 400,
      };
    }

    return {
      data: newOrder,
      messsage: "order created",
      code: 200,
    };
  }

  static async getOneOrder(id: string) {
    const order = await Orders.findByPk(id);

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
    const ordersUpdate = await Orders.update(updateOrder, { where: { id } });
    if (ordersUpdate[0] <= 0) {
      return {
        message: "order not updated",
        data: {},
        code: 400,
      };
    }

    return {
      code: 200,
      message: "oder updated ",
      data: ordersUpdate,
    };
  }

  static async deleteOrder(id: string) {
    const ordersUpdate = await Orders.update(
      { isDeleted: true },
      { where: { id } }
    );

    if (ordersUpdate[0] <= 0) {
      return {
        data: {},
        message: "order deleted",
        code: 400,
      };
    }

    return { data: ordersUpdate, message: "order deleted", code: 200 };
  }
}
