import {  ConnectionError, UniqueConstraintError, ValidationError, DatabaseError, ForeignKeyConstraintError, OptimisticLockError, TimeoutError } from 'sequelize'
import { QueryResponse } from '../types'
import {MongoNetworkError, MongoNotConnectedError, MongoNetworkTimeoutError} from 'mongodb'
export function queryErrorHandler(error: unknown) : QueryResponse{
    let dberror = sequelizeErrorHandler(error)
            if (dberror !== false)
            {
                console.error('DATABASE ERROR: ' + dberror.dbg)
                return {done:false, msg:dberror.output, data: null}
            }
            console.error('insertTrainer UNHANDLED ERROR: '+ error)
            return {done:false, msg: 'Ha ocurrido un error inesperado, si el error persiste contacte al servicio de ayuda.', data: null}
}

export function sequelizeErrorHandler(error: unknown): {dbg: string, output: string} | false {
    let message = ''
    if (error instanceof UniqueConstraintError) {
      message = error.errors.map(e => e.message).join(', ')
      return {dbg: `Error de restricción única: ${message}`, output: message}
    }
    if (error instanceof ForeignKeyConstraintError) {
      return {dbg: `Error de clave foránea: ${error.message}`, output: error.message}
    }
    if (error instanceof ValidationError) {
      message = error.errors.map(e => e.message).join(', ')
      return {dbg: `Error de validación: ${message}`, output: message}
    }
    if (error instanceof TimeoutError) {
      return {dbg: `Error de Timeout: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }
    if (error instanceof DatabaseError) {
      return {dbg: `Error en la Base de datos: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }
    if (error instanceof ConnectionError) {
      return {dbg: `Error de conexion a la db: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }
    if (error instanceof OptimisticLockError) {
      return {dbg: `OptimisticLockError: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }
    return false
}

export function mongoErrorHandler(error:unknown): {dbg: string, output: string} | false {
    if (error instanceof MongoNetworkError) {
        return {dbg: `Error de Mongo: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }
    if (error instanceof MongoNotConnectedError) {
      return {dbg: `Error de Mongo: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }
    if (error instanceof MongoNetworkTimeoutError) {
      return {dbg: `Error de Mongo: ${error.message}`, output: 'Servicio inaccesible, inténtelo de nuevo más tarde.'}
    }    return false
}