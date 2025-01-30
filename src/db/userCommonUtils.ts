import { StudentIntf, TrainerIntf } from '../types'
import { decryptStr, encryptStr, hashString } from '../utils'
import { validateEmail, validateName, validatePassword } from '../validations'
import { Student, Trainer } from './models'

export async function validateLogin(user: StudentIntf | TrainerIntf): Promise<{msg:string, user: TrainerIntf|StudentIntf|null }>{
    let errors = []
    let dbUser: Student | Trainer | null

    if(!validateEmail(user.email)){
        return { msg: 'Datos de acceso erróneos.', user:null}
    }
    if (user.role === 'student'){
        dbUser = await Student.findOne({where: {
            email: hashString(user.email)
        }})
    }else if(user.role === 'trainer'){
        dbUser = await Trainer.findOne({where: {
            email: hashString(user.email)
        }})
    }else{
        return { msg: 'Datos de acceso erróneos.', user:null}
    }
    if (dbUser && user.password === decryptStr(dbUser.password)){
        return { msg: 'Sesión iniciada exitósamente', user:dbUser.dataValues}
    }
    else
        return { msg: 'Datos de acceso erróneos.', user:null}

}

export function validateUserData(user : TrainerIntf | StudentIntf){
    if (!validateEmail(user.email) || !validateName(user.name) || !validateName(user.lastName) || !validatePassword(user.password))
        return false
}

export function encryptUserData<T extends StudentIntf | TrainerIntf>(user: T): T {
    
    user.name = encryptStr(user.name)
    user.lastName = encryptStr(user.lastName)
    user.email = hashString(user.email)
    user.phone = encryptStr(user.phone)
    user.password = encryptStr(user.password)

    return user
}

export function decryptUserData<T extends StudentIntf | TrainerIntf>(user: T): T {
    user.name = decryptStr(user.name)
    user.lastName = decryptStr(user.lastName)
    user.phone = decryptStr(user.phone)
    user.phone = decryptStr(user.phone)
    user.password = decryptStr(user.password)

    return user
}
export function isStudent(user: TrainerIntf | StudentIntf): user is StudentIntf {
    return user.role === 'student'
}

export function isTrainer(user: TrainerIntf | StudentIntf): user is TrainerIntf {
    return user.role === 'student'
}