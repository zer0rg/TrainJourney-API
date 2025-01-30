import express, { Request, Response } from 'express'
import cors from 'cors'
import { setEndpoints } from './endpoints/endpoints'
import dotenv from 'dotenv'

const app = express()
const PORT = 3000
dotenv.config()
export const config: {
  DOMAIN: string;
  PORT: number;
  SECRET_KEY: string;
  REFRESH_KEY: string;
  IV_LENGTH: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
} = {
  DOMAIN: process.env.DOMAIN || 'http://localhost',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : PORT,
  SECRET_KEY: process.env.SECRET_KEY || 'ERROR',
  REFRESH_KEY: process.env.REFRESH_KEY || 'ERROR',
  IV_LENGTH: process.env.IV_LENGTH ? parseInt(process.env.IV_LENGTH) : 16,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',

}
if (!config.SECRET_KEY) {
  console.error('No se ha definido la variable de entorno CRYPT_KEY')
  process.exit(1)
}
// Middleware para parsear JSON
app.use(cors(), express.json())



setEndpoints(app)


// Iniciar el servidor
app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en ${config.DOMAIN}:${config.PORT}`)
})
