import crypto from 'crypto'
import {config} from './index'

export function isAlpha(str: string): boolean {
  return /^\p{L}*$/u.test(str)
}

export function isNum(str: string): boolean {
  return /^\p{N}*$/u.test(str)
}

export function isAlphaNum(str: string): boolean {
  return /^\p{L}+\p{N}*$/u.test(str)
}

export function isTimeSlotFormat(str: string): boolean{
  return /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/.test(str)
}

export function getTimeSlot(str: string):number[]{
  
  str.replace('-',':')
  return str.split(':').map(Number)
}

export function hashString(str: string): string{
  return crypto.createHash('sha256').update(str).digest('hex')
}

export function encryptStr(str: string): string{
  const iv = crypto.randomBytes(config.IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', config.CRYPT_KEY, iv)
  let encrypted = cipher.update(str, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return `${iv.toString('base64')}:${encrypted}`
}

export function decryptStr(encryptedData: string): string {
  const [iv, encryptedText] = encryptedData.split(':').map(part => Buffer.from(part, 'base64'))
  const encryptionKey = Buffer.from(config.CRYPT_KEY, 'base64') // Clave en formato Buffer
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv)
  let decrypted = decipher.update(encryptedText, undefined, 'utf8')
  
  decrypted += decipher.final('utf8')
  return decrypted
}