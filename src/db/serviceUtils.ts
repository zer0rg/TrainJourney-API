import { QueryResponse, ServiceIntf, ServiceOptionalIntf } from '../types'
import { queryErrorHandler } from '../utils/errorHanlder'
import { Service } from './models'

export async function insertService(service: ServiceIntf): Promise<QueryResponse>{
    try {
        const res = await Service.create(service, {raw: true})
        return {data: res, done: true, msg: 'Servicio actualizado.'}
    } catch (error) {
        return queryErrorHandler(error)
    }
}

export async function deleteService(serviceId: number): Promise<QueryResponse>{
    try {
        const res = await Service.destroy({where: {id: serviceId}})
        return {data: res, done: true, msg: 'Servicio actualizado.'}

    } catch (error) {
        return queryErrorHandler(error)
    }
}

export async function updateService(service: ServiceIntf): Promise<QueryResponse>{
    try {
        const res = await Service.update(service, {where: {id: service.id}})
        return {data: res[0], done: true, msg: 'Servicio actualizado.'}
    } catch (error) {
        return queryErrorHandler(error)
    }
}

export async function updateServiceFields(id: string, fields: ServiceOptionalIntf): Promise<QueryResponse>{
    try {
        const res = await Service.update(fields, {where: {id: id}})
        return {data: res[0], done: true, msg: 'Servicio actualizado.'}

    } catch (error) {
        return queryErrorHandler(error)
    }
}

export async function deleteTrainerServices(trainerId: string): Promise<QueryResponse>{
    try {
        const res = await Service.destroy({where: {trainerId}})
        return {data: res, done: true, msg: 'Servicio actualizado.'}

    } catch (error) {
        return queryErrorHandler(error)
    }
}