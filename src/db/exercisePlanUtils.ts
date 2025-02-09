import { ExercisePlan } from './models'
import { ExercisePlanIntf } from '../types'
import { Transaction } from 'sequelize'

export async function getExercisePlanById(id: number)
{
    return await ExercisePlan.findByPk(id)
}

/* export async function getEntityExercisePlans(entityId: number){
    return await ExercisePlan.findAll({where: {entityId}})
} */

export async function setTrainmentExercisePlans(trainmentId: number, exercisePlanIds: number[]){
    return await ExercisePlan.update({trainmentId}, {where: {id: exercisePlanIds}})
}

export async function createExercisePlan(exercisePlan: ExercisePlanIntf){
    return await ExercisePlan.create(exercisePlan)
}
export async function createBulkExercisePlans(exercisePlans: ExercisePlanIntf[],  transaction: Transaction | null){
    return await ExercisePlan.bulkCreate(exercisePlans)
}

