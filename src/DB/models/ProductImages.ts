import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface ProductImagesInterfaces {
  id?: string;
  src_image: string;
  product_id: string;
}

export const ProductImages = sequelize.define<Model<ProductImagesInterfaces>>(
  "ProductImages",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    src_image: { type: DataTypes.STRING, allowNull: false },
    product_id: { type: DataTypes.UUID, allowNull: false },
  }
);
