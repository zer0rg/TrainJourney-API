import { isAlpha, isAlphaNum, isNum } from './utils'

export function validateName(name: string): string | boolean {
    if (typeof name !== 'string' || name.trim().length === 0 ) {
      return 'Name is required and must be a non-empty string.'
    }
    if (!isAlpha(name))
        return 'Name should only contain alphabetic characters.'
    return true
  }
  
export function validateEmail(email: string): string | boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return 'Invalid email format.'
  }
  return true
}

export function validatePassword(password: string): string | boolean {
  const errors = []
    
  if (typeof password !== 'string') {
    return 'Invalid input.'
  }
  if (password.length < 8) errors.push('Debe tener al menos 8 caracteres.')
  if (!/[A-Z]/.test(password)) errors.push('Debe tener al menos una letra mayúscula.')
  if (!/[a-z]/.test(password)) errors.push('Debe tener al menos una letra minúscula.')
  if (!/\d/.test(password)) errors.push('Debe tener al menos un número.')
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Debe tener al menos un carácter especial.')
  return errors.length === 0 ? 'Contraseña válida' : `Errores: ${errors.join(' ')}`
}

export function validateRole(role: string): string | boolean {
  if (role !== 'trainer' && role !== 'student') {
    return 'Role must be either \'trainer\' or \'student\'.'
  }
  return true
}

export function validateSpecializations(specializations: string[]): string | boolean {
  if (!Array.isArray(specializations)) {
    return 'Specializations must be an array.'
  }
  if (specializations.length === 0) {
    return 'Specializations cannot be empty.'
  }
  return true
}

export function validateCourse(course: string): string | boolean {
  if (typeof course !== 'string' || course.trim().length === 0) {
    return 'Course is required and must be a non-empty string.'
  }
  return true
}

export function validateDate(date: string): string | boolean {
  const isValidDate = !isNaN(Date.parse(date))
  if (!isValidDate) {
    return 'Invalid date format.'
  }
  return true
}

export function validateGender(gender: string): string | boolean {
  const validGenders = ['male', 'female', 'non-binary']
  if (!validGenders.includes(gender)) {
    return 'Gender must be \'male\', \'female\', or \'non-binary\'.'
  }
  return true
}

export function validateWeight(weight: number): string | boolean {
  if (typeof weight !== 'number' || weight <= 0) {
    return 'Weight must be a positive number.'
  }
  return true
}

export function validateHeight(height: number): string | boolean {
  if (typeof height !== 'number' || height <= 0) {
    return 'Height must be a positive number.'
  }
  return true
}

export function validateWeightGoal(weightGoal: number): string | boolean {
  if (typeof weightGoal !== 'number' || weightGoal <= 0) {
    return 'Weight goal must be a positive number.'
  }
  return true
}

  