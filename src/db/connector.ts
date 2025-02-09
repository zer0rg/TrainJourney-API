import { Sequelize } from 'sequelize'
import { MongoClient } from 'mongodb'


export const sequelize = new Sequelize('trainapp', 'appadmin', 'adminpass123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // Habilita el logging

})


const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

export const connectMongo = async () => {
  await client.connect()
  return client.db('miBaseDeDatos')
}
