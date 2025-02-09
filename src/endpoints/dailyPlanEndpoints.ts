import { Express, Request, Response } from 'express'
import { getDailyPlansByTrainer } from '../db/dailyPlanUtils'

function gets(app: Express){
    app.get('/dailyPlan', (req: Request, res: Response) => {
        const planId : string = req.query.id as string
        const trainerUuid : string = req.query.trainerId as string
        if ((!planId || planId === '') && (!trainerUuid || trainerUuid === '')) {
            res.status(400).json({done:false, msg:'No se ha proporcionado un id de plan diario.', data:null})
        }
       
    })
    app.get('/dailyPlans', async (req: Request, res: Response) =>{
        const trainerUuid : string = req.query.trainerId as string
        if (!trainerUuid || trainerUuid === '') {
            res.status(400).json({done:false, msg:'No se ha proporcionado un id de entrenador.', data:null})
            return
        }
        const result = await getDailyPlansByTrainer(trainerUuid)
        if (!result.done)
            res.status(400).json(result)
        else
            res.status(200).json(result)
        
    })
}
function posts(app: Express){
    
}
function puts(app: Express){
    
}
function deletes(app: Express){
    
}
export function dailyPlanEndpoints(app: Express){
    gets(app)
    posts(app)

}