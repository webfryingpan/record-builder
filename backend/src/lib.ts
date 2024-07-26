import CryptoJS from 'crypto-js'

export const parseHex = (value: string) => CryptoJS.enc.Hex.parse(value)
