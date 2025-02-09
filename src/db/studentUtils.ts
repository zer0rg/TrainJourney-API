import { Student } from './models'
import { QueryResponse, StudentIntf, TrainerIntf } from '../types'
import { validateDate, validateGender, validateWeight, validateHeight } from '../utils/validations'
import { queryErrorHandler } from '../utils/errorHanlder'

export function getStudentById(id: number)
{
    Student.findByPk(id).then(res => {
        return res
    })
}


/* export async function getEntityStudents(entityId: number){ PENDIENTE DE REVISAR COMO HACER QUERYES ENTRE HIJOS Y PADRES
    return await Student.findAll({where: {entityId}})
} */


export async function insertStudent(student: StudentIntf) : Promise<QueryResponse>{
    try {
        const res = await Student.create(student)
        return {data: res, done: true, msg: 'Estudiante creado exitosamente'}
    } catch (error) {
        return queryErrorHandler(error)
    }
}

export function validateStudentData(student: StudentIntf) : boolean | string
{

    let res = validateDate(student.enrollmentDate)
    if (typeof res != 'boolean') return res
    res = validateGender(student.gender)
    if (typeof res != 'boolean') return res
    res = validateWeight(student.weight)
    if (typeof res != 'boolean') return res
    res = validateHeight(student.height)
    if (typeof res != 'boolean') return res
    res = validateWeight(student.weightGoal)
    if (typeof res != 'boolean') return res 

    return true
}

