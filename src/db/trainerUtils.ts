import { StudentIntf, TrainerIntf } from '../types'
import { Trainer } from './models'

export async function getTrainerById(id: number)
{
    return await Trainer.findByPk(id)
}

export async function getEntityTrainers(entityId: number){
    return await Trainer.findAll({where: {entityId}})
}

export async function insertTrainer(trainer: TrainerIntf) : Promise<unknown> {

    try {
        await Trainer.create(trainer)
        return true
    } catch (error) {
        return error
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