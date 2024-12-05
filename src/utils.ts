export function isAlpha(str: string): boolean {
  return /^\p{L}*$/u.test(str);
}

export function isNum(str: string): boolean {
  return /^\p{N}*$/u.test(str);
}

export function isAlphaNum(str: string): boolean {
  return /^\p{L}+\p{N}*$/u.test(str);
}