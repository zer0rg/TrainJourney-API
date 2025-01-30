import {Express, Request, Response} from 'express'
import { encryptUserData, isStudent, isTrainer, validateLogin, validateUserData } from '../db/userCommonUtils'
import jwt from 'jsonwebtoken'
import { LoginResponse, StudentIntf, TrainerIntf } from '../types'
import { config } from '..'
import { insertStudent, validateStudentData } from '../db/studentUtils'
import { insertTrainer, validateTrainerData } from '../db/trainerUtils'


function userPosts(app : Express){
    // Endpoint para registrar un usuario
    app.post('/signup', (req: Request, res: Response) => {
        let user: TrainerIntf | StudentIntf = req.body
        let response : LoginResponse = {res: 'KO', data: null, msg: 'Revisa los datos y vuelve a intentarlo'}
       
        
    
        if (!validateUserData(user))
        {
            res.status(401).json(response)
            return
        } 
        
        if (isStudent(user))
        {
            const check = validateStudentData(user)
            if (check !== true){
                response.msg = 'No pasa check'
                res.status(401).json(response)
                return
            }
            user = encryptUserData(user)
            insertStudent(user).then(dbres => {
                if (dbres !== true){
                    response.msg = 'Error en la creación: ' + dbres
                    res.status(401).json(response)
                    return
                }
            })
        }
        if (isTrainer(user))
        {
            const check = validateTrainerData(user)
            if (check !== true){
                response.msg = 'No pasa check'
                res.status(401).json(response)
                return

            }
            user = encryptUserData(user)
            insertTrainer(user).then(dbres => {
                if (dbres !== true){
                    response.msg = 'Error en la creación: ' + dbres
                    res.status(401).json(response)
                    return
                }
            })
        }    

        response.msg = 'Usuario registrado.'
        response.res = 'OK'
        res.status(200).json(response)
    })

    app.post('/login' ,async (req: Request, res: Response) => {

        const  reqUser : StudentIntf | TrainerIntf = req.body
        validateLogin(reqUser).then(({ msg, user}) => {
        if (user)
        {
            const refreshToken = jwt.sign({
                email: user.email
            }, config.REFRESH_KEY || 'refresh', {expiresIn: '1d'})
    
            res.cookie('refreshToken', refreshToken)
            res.status(200).json(user)
        }else{
            res.status(401).json({
                result: 'KO',
                msg: msg
            })
        }
        })       
    })

    //No usar todavía
    app.post('refresh_token', (req: Request, res: Response) => {
        const { refreshToken } = req.body

        if (!refreshToken) {
            res.status(403).json({ msg: 'No se ha encontrado refreshToken' })
        }
    
        try {
            const payload = jwt.verify(refreshToken, config.REFRESH_KEY || 'refreshprueba') as any
    
            const newToken = jwt.sign(
                { email: payload.email },
                config.REFRESH_KEY || 'pruebatoken',
                { expiresIn: '10m' }
            )
            
            res.cookie('refreshToken', newToken, )
            res.json({
                accessToken: newToken
            })
        } catch (error) {
            res.status(401).json({ msg: 'Ha expirado o invalido' })
        }
    })
}
  
export function userRoutes(app: Express){
    userPosts(app)
}

