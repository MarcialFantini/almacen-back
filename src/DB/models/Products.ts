import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { Orders } from "./Orders";

export interface ProductInterface {
  id: string;
  name: string;
  amount: number;
  price: number;
  isDeleted: boolean;
}

export const Product = sequelize.define<Model<ProductInterface>>("Product", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});
Product.hasMany(Orders, { foreignKey: "product_id" });
Orders.belongsTo(Product, { foreignKey: "product_id" });
