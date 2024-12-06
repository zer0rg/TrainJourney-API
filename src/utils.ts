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