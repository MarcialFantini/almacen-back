import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../connection";
import { Orders } from "./Orders";

export interface UserInterface {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  role: string;
}
export const User = sequelize.define<Model<UserInterface>>("User", {
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
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "normal",
  },
});

User.hasMany(Orders, { foreignKey: "user_id" });

Orders.belongsTo(User, { foreignKey: "user_id" });
