import {Express, Request, Response} from 'express'
import { encryptUserData, isStudent, isTrainer, validateLogin, validateUserData } from '../db/userCommonUtils'
import jwt from 'jsonwebtoken'
import {  QueryResponse, StudentIntf, TrainerIntf } from '../types'
import { config } from '..'
import { insertStudent, validateStudentData } from '../db/studentUtils'
import { insertTrainer, validateTrainerData } from '../db/trainerUtils'


function userPosts(app : Express){
    app.post('/signup', async (req: Request, res: Response) => {
        const user: TrainerIntf | StudentIntf = req.body
        let insertResult: QueryResponse = { done: false, data: null, msg: 'Revisa los datos y vuelve a intentarlo' }
        const validation = validateUserData(user)
        if (typeof validation === 'string') {
          insertResult.msg = validation
          res.status(400).json(insertResult) 
          return
        }
    
        try {
          if (isStudent(user)) {
            const studentValidation = validateStudentData(user)
            if (typeof studentValidation !== 'boolean') {
              insertResult.msg = studentValidation 
              res.status(400).json(insertResult)
              return
            }
    
            const encryptedUser = encryptUserData(user)
            insertResult = await insertStudent(encryptedUser)
    
            if (insertResult.done !== true) {
              insertResult.msg = `Error en la creación: ${insertResult}`
              res.status(500).json(insertResult)
              return
            }
    
          } else if (isTrainer(user)) {
            console.log(user)
            const trainerValidation = validateTrainerData(user)
            if (typeof trainerValidation !== 'boolean') {
              insertResult.msg = trainerValidation 
              res.status(400).json(insertResult)
              return
            }
    
            const encryptedUser = encryptUserData(user)
            insertResult = await insertTrainer(encryptedUser)
    
            if (insertResult.done !== true) {
              res.status(400).json(insertResult)
              return
            }
    
          } else {
            insertResult.msg = 'Tipo de usuario inválido.'
            res.status(400).json(insertResult)
            return
          }
  
        res.status(201).json(insertResult)
    
        } catch (error) {
            console.error('Error en /signup:', error)
            insertResult.msg = 'Error en el servidor.'
            res.status(500).json(insertResult)
            return
        }
      })

    app.post('/login' ,async (req: Request, res: Response) => {
      let insertResult: QueryResponse = { done: false, data: null, msg: 'Revisa los datos y vuelve a intentarlo' }

      const  reqUser : StudentIntf | TrainerIntf = req.body
      validateLogin(reqUser).then(({ msg, user}) => {
        if (user)
        {
            const refreshToken = jwt.sign({
                email: user.email
            }, config.REFRESH_KEY || 'refresh', {expiresIn: '1d'})
          
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true
            })
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

