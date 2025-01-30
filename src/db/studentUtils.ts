import { Student } from './models'
import { sequelize } from './connector'
import { StudentIntf, TrainerIntf } from '../types'
import { validateName, validateEmail, validatePassword, validateDate, validateGender, validateWeight, validateHeight } from '../validations'
import { encryptStr, decryptStr, hashString } from '../utils'

export function getStudentById(id: number)
{
    Student.findByPk(id).then(res => {
        return res
    })
}


/* export async function getEntityStudents(entityId: number){ PENDIENTE DE REVISAR COMO HACER QUERYES ENTRE HIJOS Y PADRES
    return await Student.findAll({where: {entityId}})
} */


export async function insertStudent(student: StudentIntf) : Promise<unknown> {

    try {
        await Student.create(student)
        return true
    } catch (error) {
        return error
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

