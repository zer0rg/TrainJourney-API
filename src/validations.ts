import { getTimeSlot, isAlpha, isAlphaNum, isNum, isTimeSlotFormat } from './utils'

/**
 *
 *
 * @export
 * @param {string} name
 * @return {*}  {(string | boolean)}
 */
export function validateName(name: string): string | boolean {
    name = name.trim()
    if (typeof name !== 'string' || name.length === 0 ) {
      return 'El nombre no puede estar vacío.'
    }
    if (!isAlpha(name))
        return 'El nombre solo puede contener letras'
    return true
  }
  
/**
 *
 *
 * @export
 * @param {string} email
 * @return {*}  {(string | boolean)}
 */
export function validateEmail(email: string): string | boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return 'El email introducido no es válido.'
  }
  return true
}

/**
 *
 *
 * @export
 * @param {string} password
 * @return {*}  {(string | boolean)}
 */
export function validatePassword(password: string): string | boolean {
    
  if (typeof password !== 'string') {
    return 'Invalid input.'
  }
  if (password.length < 8) return 'Contraseña insegura'
  if (!/[A-Z]/.test(password)) return 'Contraseña insegura'
  if (!/[a-z]/.test(password)) return 'Contraseña insegura'
  if (!/\d/.test(password)) return 'Contraseña insegura'
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'No hay carácteres especiales'
  return true
}

export function validateRole(role: string): string | boolean {
  if (role !== 'trainer' && role !== 'student') {
    return 'El rol tiene que ser entenador o estudiante.'
  }
  return true
}

export function validateSpecializations(specializations: string[]): string | boolean {
  if (!Array.isArray(specializations)) {
    return 'Las especializaciones tienen que ser un array.'
  }
  if (specializations.length === 0) {
    return 'Es necesario incluir almenos una especialización.'
  }
  return true
}

export function validateDate(date: Date): string | boolean {
  const now = new Date()
  const isValidDate = date.getFullYear() == now.getFullYear() && date.getDay() == now.getDay() && date.getMonth() == now.getMonth()
  if (!isValidDate) {
    return 'La fecha de registro ha de ser la del dia en cuestión.'
  }
  return isValidDate
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

export function validateTimeSlot(timeSlotStr:string): string | boolean{
  let timeSlot: number[]

  if (!isTimeSlotFormat(timeSlotStr))
    return 'Time slot format does´t match the expected one.'
  timeSlot = getTimeSlot(timeSlotStr)
  if (!(timeSlot[0] < timeSlot[2] || (timeSlot[0] == timeSlot[2] && timeSlot[1] < timeSlot[3]) || timeSlot[0] == 23 && timeSlot[2] == 0))
    return 'Invalid time slot'
  return true
}