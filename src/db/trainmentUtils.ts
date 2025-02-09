import { type } from 'os'
import { CreateTrainmentWithPlanParams, QueryResponse, TrainmentIntf } from '../types'
import { queryErrorHandler, sequelizeErrorHandler } from '../utils/errorHanlder'
import { numberNotNull, stringNotNull } from '../utils/utils'
import { Trainment } from './models'
import { sequelize } from './connector'
import { createBulkExercisePlans } from './exercisePlanUtils'
import { Transaction } from 'sequelize'

function validateTrainmentCreationParams(trainment: TrainmentIntf): boolean | string {
    if (stringNotNull(trainment.name)) return 'El nombre no puede estar vacío' 
    if (stringNotNull(trainment.description)) return ''
    if (numberNotNull(trainment.entityId)) return ''
    return true
}

export async function createTrainment(trainment : TrainmentIntf, transaction:Transaction | null): Promise<QueryResponse>{
    try {
        const validation = validateTrainmentCreationParams(trainment)
        if (typeof validation !== 'boolean') {
            return { done: false, msg: validation, data: null }
        }
        let created
        if (transaction) created = await Trainment.create(trainment, {transaction})
        else
            created = await Trainment.create(trainment)
        return { done: true, msg: 'Entrenamiento creado exitosamente', data: created }
    } catch (error) {
        return queryErrorHandler(error)

    }
}

export async function createTrainmentWithPlans(params : CreateTrainmentWithPlanParams): Promise<QueryResponse>{
    const transaction = await sequelize.transaction()
    try {
        const {data, done, msg} = await createTrainment({description: params.description, entityId: params.entityId, name: params.name}, transaction)
        if (done === false || data === null || !isTrainmentIntf(data))
            return { done: true, msg: 'Error al crear el entrenamiento', data: null }
        if (isTrainmentIntf(data) && data.id !== undefined)
            params.exercisePlans.map(plan => plan.trainmentId = data.id)

        const createdPlans = await createBulkExercisePlans(params.exercisePlans, transaction)
        data.exercisePlans = createdPlans
        return { done: true, msg: 'Entrenamiento con planes de ejercicios creado exitosamente', data }

        
    } catch (error) {
        transaction.rollback()
        return queryErrorHandler(error)

    }
}
export function isTrainmentIntf(arg: any): arg is TrainmentIntf {
    return arg.name !== undefined && arg.description !== undefined && arg.entityId !== undefined
}