import { Reservation } from './models'
import { sequelize } from './connector'

export async function getReservationsByDate(trainerId: string, date: Date): Promise<Reservation[]> {
    try {
      const reservations = await Reservation.findAll({
        where: {
          date: date.toDateString(), 
          trainerId,
        },
      })
      return reservations 
    } catch (error) {
      console.error('Error getting Reservation:', error)
      throw error
    }
}

export async function getAllTrainerReservations(trainerId: string): Promise<Reservation[]> {
    try {
      const reservations = await Reservation.findAll({
        where: {
          trainerId,
        },
      })
      return reservations 
    } catch (error) {
      console.error('Error getting Reservation:', error)
      throw error
    }
}
export async function getAllStudentReservations(studentId: string): Promise<Reservation[]> {
    try {
      const reservations = await Reservation.findAll({
        where: {
            studentId,
        },
      })
      return reservations 
    } catch (error) {
      console.error('Error getting Reservation:', error)
      throw error
    }
}

export async function getStudentReservationsByDate(studentId: string, date:Date): Promise<Reservation[]> {
    try {
      const reservations = await Reservation.findAll({
        where: {
            date: date.toDateString(),
            studentId,
        },
      })
      return reservations 
    } catch (error) {
      console.error('Error getting Reservation:', error)
      throw error
    }
}