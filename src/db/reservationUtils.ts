import { Reservation } from './models'
import { sequelize } from './connector'
import { queryErrorHandler } from '../utils/errorHanlder'
import { QueryResponse, ReservationIntf } from '../types'

type arrayReservationsReturn = Promise<{data: ReservationIntf[] | null , output: string}>

export async function getReservationsByDate(trainerId: string, date: Date): Promise<QueryResponse> {
    try {
      const reservations = await Reservation.findAll({
        where: {
          date: date.toDateString(), 
          trainerId,
        },
        raw: true
      })
      return {data: reservations, done: true, msg: 'Consulta existosa de reservas'}

    } catch (error) {
      return queryErrorHandler(error)
    }
}

export async function getAllTrainerReservations(trainerId: string): Promise<QueryResponse> {
    try {
      const reservations = await Reservation.findAll({
        where: {
          trainerId,
        },
        raw: true
      })
      return {data: reservations, done: true, msg: 'Consulta existosa de reservas'}

    } catch (error) {
      return queryErrorHandler(error)
    }
}
export async function getAllStudentReservations(studentId: string): Promise<QueryResponse> {
    try {
      const reservations = await Reservation.findAll({
        where: {
            studentId,
        },
        raw: true
      })
      return {data: reservations, done: true, msg: 'Consulta existosa de reservas'}

    } catch (error) {
      return queryErrorHandler(error)
    }
}

export async function getStudentReservationsByDate(studentId: string, date:Date): Promise<QueryResponse> {
    try {
      const reservations = await Reservation.findAll({
        where: {
            date: date.toDateString(),
            studentId,
        }, raw: true
      })
     
      return {data: reservations, done: true, msg: 'Consulta existosa de reservas'}

    } catch (error) {
      return queryErrorHandler(error)
    }
}