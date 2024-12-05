import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("train_app", "trainapp", "LetrasNumeros1!", {
  host: "localhost",
  dialect: "mysql",
});
