import { AES, enc } from 'crypto-js'

// TODO: change to alg
const PASS = '123'

export function e(text: string) {
  return AES.encrypt(text, PASS).toString()
}

export function d(text: string) {
  return AES.decrypt(text, PASS).toString(enc.Utf8)
}
