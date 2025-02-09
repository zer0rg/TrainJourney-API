import { Express, Request, Response } from 'express'

function reservationsPosts(app : Express)
{
    app.post('/reservations', async (req: Request, res: Response) => {
        const { trainerId, studentId, date, timeSlot } = req.body
        
        try {
          if (!trainerId || !studentId || !date || !timeSlot) {
            res.status(400).json({ error: 'Faltan campos obligatorios.' })
            return 
          }
          res.status(200).json({ success: true })
        } catch (error) {
          res.status(500).json({ error: 'Error al crear la reserva:' + error})
        }
  })
}

function reservationsGets(app : Express)
{
    app.get('/reservations', async (req: Request, res: Response) => {
        const reservvations = ''
        try {
        
          res.status(200).json({ success: true, reservvations})
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener las reservas.' })
        }
    })
  
    app.get('/reservations/:id', async (req: Request, res: Response) => {
        const { id } = req.params
        let reservation: string = ''
        
        try {
        
        
          if (!reservation) {
            res.status(404).json({ error: 'Reserva no encontrada.' })
            return
          }
      
          res.status(200).json(reservation)
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la reserva.' })
        }
  })
}
function reservationsPuts(app: Express){
    app.put('/reservations/:id', async (req: Request, res: Response) => {
      const { id } = req.params
      const { trainerId, studentId, date, timeSlot } = req.body
    
      try {
        const reservation = ''
      
        if (!reservation) {
          res.status(404).json({ error: 'Reserva no encontrada.' })
          return 
        }
        res.status(200).json({ success: true, reservation })
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la reserva.' })
      }
    })
}

function reservationsDeletes(app: Express){
  app.delete('/reservations/:id', async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const reservation = ''

      if (!reservation) {
        res.status(404).json({ error: 'Reserva no encontrada.' })
        return 
      }

      res.status(200).json({ success: true, message: 'Reserva eliminada correctamente.', id })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la reserva:' + error })
    }
  })
}

export function reservationsRoutes(app: Express){
  reservationsGets(app)
  reservationsPosts(app)
  reservationsPuts(app)
  reservationsDeletes(app)
}