import { Express, Request, Response } from 'express'
import { Db } from 'mongodb'
import { getAllFoods } from '../db/foodUtils'

function gets(app:Express, mongoDb:Db){
    app.get('/foods/all', async (req: Request, res: Response) => {
        const result = await getAllFoods(mongoDb)
        if (result.done) {
            res.status(200).json(result)
        }
    })

    app.get('/foods', async (req: Request, res: Response) => {
        const offset: number = req.query.offset ? parseInt(req.query.offset as string, 10) : 0
        const limit: number = req.query.limit ? parseInt(req.query.limit as string, 10) : 25
        const result = await getAllFoods(mongoDb)
        if (result.done) {
            res.status(200).json(result)
        }
    })
    app.get('/food/:id', async (req: Request, res: Response) => {
        const name = req.params.name
        const food = await mongoDb.collection('off').findOne({ id: name })
        res.json(food)
    })

}

function posts(app:Express, mongoDb: Db){

}
function puts(app:Express, mongoDb: Db){
    
}
function deletes(app:Express, mongoDb: Db){
    
}
export function foodEndpoints(app: Express, mongoDb:Db){
    
    gets(app, mongoDb)
    posts(app, mongoDb)
    puts(app, mongoDb)
    deletes(app, mongoDb)
}