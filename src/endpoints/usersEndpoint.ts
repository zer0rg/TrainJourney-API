import {Express, Request, Response} from 'express'
import { validateName, validateEmail, validatePassword, validateRole, validateSpecializations, 
    validateCourse, validateDate, validateGender, validateWeight, validateHeight, validateWeightGoal } from '../validations'
    
function userPosts(app : Express){
    // Endpoint para registrar un usuario
    app.post(
        '/signup',
        (req: Request, res: Response) => {
        const { name, email, password, role, specializations, course, enrollmentDate, gender, weight, height, weightGoal } = req.body
    
        // Validaciones
        const validationErrors: string[] = []
    
        const nameError = validateName(name)
        if (typeof nameError !== 'boolean') validationErrors.push(nameError)
    
        const emailError = validateEmail(email)
        if (typeof emailError != 'boolean') validationErrors.push(emailError)
    
        const passwordError = validatePassword(password)
        if (typeof passwordError != 'boolean') validationErrors.push(passwordError)
    
        const roleError = validateRole(role)
        if (typeof roleError != 'boolean') validationErrors.push(roleError)
    
        if (role === 'trainer') {
            const specializationsError = validateSpecializations(specializations)
            if (typeof specializationsError != 'boolean') validationErrors.push(specializationsError)
        }
    
        if (role === 'student') {
            const courseError = validateCourse(course)
            if (typeof courseError != 'boolean') validationErrors.push(courseError)
    
            const dateError = validateDate(enrollmentDate)
            if (typeof dateError != 'boolean') validationErrors.push(dateError)
    
            const genderError = validateGender(gender)
            if (typeof genderError != 'boolean') validationErrors.push(genderError)
    
            const weightError = validateWeight(weight)
            if (typeof weightError != 'boolean') validationErrors.push(weightError)
    
            const heightError = validateHeight(height)
            if (typeof heightError != 'boolean') validationErrors.push(heightError)
    
            const weightGoalError = validateWeightGoal(weightGoal)
            if (typeof weightGoalError != 'boolean') validationErrors.push(weightGoalError)
        }
    
        if (validationErrors.length > 0) {
            res.status(400).json({
            success: false,
            message: 'Failed.',
            errors: validationErrors,
            })
            return
        }
    
        res.status(200).json({
            success: true,
            message: 'Signup successful!',
        })
        }
    )
}
  
export function userRoutes(app: Express){
    userPosts(app)
}