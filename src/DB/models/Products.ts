import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { Orders } from "./Orders";
import { ProductImages } from "./ProductImages";

export interface ProductInterface {
  id: string;
  name: string;
  amount: number;
  price: number;
  isDeleted: boolean;
  category: string;
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
  category: {
    type: DataTypes.STRING,

    allowNull: false,
  },
});
Product.hasMany(Orders, { foreignKey: "product_id" });
Orders.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(ProductImages, { foreignKey: "product_id" });
ProductImages.belongsTo(Product, { foreignKey: "product_id" });
