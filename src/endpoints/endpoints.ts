import { Express } from 'express'
import { reservationsRoutes } from './reservationEndpoint'
import { userRoutes } from './usersEndpoint'
import { trainerRoutes } from './trainerEndpoint'

export function setEndpoints(app: Express) {
    trainerRoutes(app)
    userRoutes(app)
    reservationsRoutes(app)

}