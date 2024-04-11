import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  dialect: "postgres",
  host: "127.0.0.1",
  port: 5432,
});

export const connect = async () => {
  try {
    await sequelize.validate();
    await sequelize.sync({ alter: true });
    console.log("good");
  } catch (error) {
    console.log(error);
  }
};
