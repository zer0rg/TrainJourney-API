import {Express, Request, Response} from 'express'

function servicesGets(app: Express){
    app.get('servicios/:id', (req: Request, res: Response) => {
        const {id} = req.params
        
    })
}

function servicesPosts(){

}

function servicesPuts(){

}

function servicesDels(){

}

export function setServicesEndpoints(app: Express){
    servicesGets(app)
}