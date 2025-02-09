import {Express, Request, Response} from 'express'
import { Trainment } from '../db/models'
import { TrainmentIntf } from '../types'

function gets(app: Express){
    app.get('servicios/:id', (req: Request, res: Response) => {
        const {id} = req.params
        
    })
}

function posts(app:Express){

}

function puts(){

}

function deletes(){

}

export function trainmentEndpoints(app: Express){
    gets(app)
    posts(app)
}