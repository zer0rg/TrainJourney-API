import {Express, Request, Response} from 'express'

import { Trainer } from '../db/models'
import { TrainerIntf } from '../types'

function trainerPosts(app:Express){

    app.post('/trainer/update', (req: Request, res: Response) => {
        
    })
}

export function trainerRoutes(app: Express){
}

