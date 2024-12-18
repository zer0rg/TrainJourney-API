import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('trainapp', 'appadmin', 'adminpass123', {
  host: 'localhost',
  dialect: 'mysql',
})
