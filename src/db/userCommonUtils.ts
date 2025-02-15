import { StudentIntf, TrainerIntf } from '../types'
import { decryptStr, encryptStr, hashString } from '../utils/utils'
import { validateEmail, validateName, validatePassword } from '../utils/validations'
import { Student, Trainer } from './models'

export async function validateLogin(user: StudentIntf | TrainerIntf): Promise<{msg:string, user: TrainerIntf|StudentIntf|null }>{
    let errors = []
    let dbUser: Student | Trainer | null

    if(!validateEmail(user.email)){
        console.log('email error')
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
        console.log('role error')

        return { msg: 'Datos de acceso erróneos.', user:null}
    }
    if (dbUser && user.password === decryptStr(dbUser.password)){
        return { msg: 'Sesión iniciada exitósamente', user:dbUser.dataValues}
    }
    else{
        console.log('no match error')
        return { msg: 'Datos de acceso erróneos.', user:null}
    }
        

}

export function validateUserData(user : TrainerIntf | StudentIntf){

    let check = validateEmail(user.email)
    if (check !== true) return check
    check = validateName(user.name)
    if (check !== true) return check
    check = validateName(user.lastName)
    if (check !== true) return check
    return validatePassword(user.password)
    
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
    user.password = decryptStr(user.password)

    return user
}
export function isStudent(user: TrainerIntf | StudentIntf): user is StudentIntf {
    return user.role === 'student'
}

export function isTrainer(user: TrainerIntf | StudentIntf): user is TrainerIntf {
    return user.role === 'trainer'
}