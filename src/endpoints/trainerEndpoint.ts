import {Express, Request, Response} from 'express'

import { Trainer } from '../db/models'
import { TrainerIntf } from '../types'

function trainerPosts(app:Express){
    app.post('/login', (req: Request, res:Response) => {


    })

    app.post('/sign', (req: Request, res:Response) => {
        const trainer: TrainerIntf = req.body
        
        
    })
}

export function trainerRoutes(app: Express){
}
