import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

interface LogsInterface {
  id: string;
  user_id: string;
  action: string;
  isDelted: boolean;
}

export const Logs = sequelize.define<Model<LogsInterface>>("Logs", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDelted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
