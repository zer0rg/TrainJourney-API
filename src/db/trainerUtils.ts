import { QueryResponse, StudentIntf, TrainerIntf } from '../types'
import { queryErrorHandler } from '../utils/errorHanlder'
import { Trainer } from './models'

export async function getTrainerById(id: number)
{
    return await Trainer.findByPk(id,  { raw: true})
}

export async function getEntityTrainers(entityId: number){
    try {
    const trainers = await Trainer.findAll({where: {entityId}, raw: true})
    return {data: trainers, done: true, msg: 'Consulta existosa de reservas'}

} catch (error) {
  return queryErrorHandler(error)
}    
}

export async function insertTrainer(trainer: TrainerIntf) : Promise<QueryResponse> {

    try {
        await Trainer.create(trainer, { raw: true})
        return {data: trainer, done: true, msg: 'Consulta existosa de reservas'}

    } catch (error) {
      return queryErrorHandler(error)
    }
}


export function validateTrainerData(trainer : TrainerIntf) : boolean | string
{
    return true
}
export function encryptTrainerData(){

}

export function decryptTrainerData(){
    
}