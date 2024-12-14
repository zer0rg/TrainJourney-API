import { Express } from 'express'
import { reservationsRoutes } from './reservationEndpoint'
import { userRoutes } from './usersEndpoint'

export function setEndpoints(app: Express){
    userRoutes(app)
    reservationsRoutes(app)
}