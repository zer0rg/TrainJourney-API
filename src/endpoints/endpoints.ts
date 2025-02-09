import { Express } from 'express'
import { reservationsRoutes } from './reservationEndpoint'
import { userRoutes } from './usersEndpoint'
import { trainerRoutes } from './trainerEndpoint'
import { Db } from 'mongodb'
import { dailyPlanEndpoints } from './dailyPlanEndpoints'

export function setEndpoints(app: Express, mongoCon: Db | null) {
    trainerRoutes(app)
    userRoutes(app)
    reservationsRoutes(app)
    dailyPlanEndpoints(app)
   // foodEnpoints(app, mongoCon)

}