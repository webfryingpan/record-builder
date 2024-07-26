import CryptoJS from 'crypto-js'

const secretKey = process.env.SECRET_KEY as string

export const decryptData = (encrypted: string, iv: CryptoJS.lib.WordArray) => {
	return CryptoJS.enc.Utf8.stringify(
		CryptoJS.AES.decrypt(encrypted, secretKey, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		})
	)
}

export const encryptData = (data: string): string => {
	const iv = CryptoJS.lib.WordArray.random(16)
	const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	})
	return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.toString()}`
}
