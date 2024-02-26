import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface OrdersInterface {
  id: string;
  product_id: string;

  user_id: string;
  amount: number;

  isDeleted: boolean;
  isCompleted: boolean;
}

export const Orders = sequelize.define<Model<OrdersInterface>>("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
