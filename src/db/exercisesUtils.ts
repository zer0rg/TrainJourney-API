import { Exercise } from './models'


/**
 *
 *
 * @export
 * @param {number} id
 * @return {*} 
 */
export async function getExerciseById(id: number) 
{
    return await Exercise.findByPk(id)
}

/**
 *
 *
 * @export
 * @param {number} entityId
 * @return {*} 
 */
export async function getEntityExercises(entityId: number){
    return await Exercise.findAll({where: {entityId}})
}

/* export async function getTrainerExercises(trainerId: number){
    return await Exercise. findAll({where: {trainerId}})
} */