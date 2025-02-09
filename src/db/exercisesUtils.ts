import { ExerciseIntf, QueryResponse } from '../types'
import { queryErrorHandler, sequelizeErrorHandler } from '../utils/errorHanlder'
import { numberNotNull, stringNotNull } from '../utils/utils'
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

export async function createExcersise(exercise: ExerciseIntf) : Promise<QueryResponse>{
    try {
    const validation = validateExerciseParams(exercise)
    if (typeof validation !== 'boolean') return { done: false, msg: validation, data: null }
    const created = await Exercise.create(exercise)
    return { done: true, msg: 'Ejercicio creado exitosamente', data: created }
    } catch (error) {
        return queryErrorHandler(error)
    }
}


function validateExerciseParams(exercise: ExerciseIntf): boolean | string {
    if (!stringNotNull(exercise.name)) return 'El nombre no puede estar vacío'
    if (!stringNotNull(exercise.description)) return 'La descripción no puede estar vacía'
    if (!stringNotNull(exercise.videoUrl)) return 'La url del video no puede estar vacía'
    if (!numberNotNull(exercise.entityId)) return 'El id de la entidad no puede estar vacío'
    return true
}