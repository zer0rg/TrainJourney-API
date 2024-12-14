import express, { Request, Response } from 'express'
import cors from 'cors'
import { setEndpoints } from './endpoints/endpoints'

const app = express()
const PORT = 3000

// Middleware para parsear JSON
app.use(cors(), express.json())



setEndpoints(app)


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
