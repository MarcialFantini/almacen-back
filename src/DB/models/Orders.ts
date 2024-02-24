import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { User } from "./Users";
import { Product } from "./Products";

interface OrdersInterface {
  id: string;
  product_id: string;

  user_id: string;
  amount: number;
}

export const Orders = sequelize.define<Model<OrdersInterface>>("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
