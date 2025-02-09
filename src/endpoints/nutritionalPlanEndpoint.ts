import { NutritionalPlan } from '../db/models'
import { NutritionalPlanIntf } from '../types'
import { Express, Request, Response } from 'express'

function posts(app: Express){
    app.post('nutritionalPlan/create', (req: Request, res: Response) => {
        const plan : NutritionalPlanIntf = req.body 
    })
    app.post('nutritionalPlan/update', (req: Request, res: Response) => {

    })
}

function gets(app: Express){
    app.get('nutritionalPlan/:id', (req: Request, res: Response) => {
        
    })
}

function puts(app: Express){
    app.put('nutritionalPlan/create', (req: Request, res: Response) => {
        
    })
}

function deletes(app: Express){
    app.delete('nutritionalPlan/:id', (req: Request, res: Response) => {
        
    })
}


export function nutritionalPlanEndrpoints(app: Express) {
    posts(app)
    gets(app)
    puts(app)
    deletes(app)
}