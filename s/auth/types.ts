
export type PubkeyData = {
	thumbprint: string
	publicKey: string
}

export type KeypairData = {
	privateKey: string
} & PubkeyData

export type PassportData = {
	keypair: KeypairData
	name: string
	created: number
}

export type PassportsFileData = {
	format: string
	version: number
	passports: PassportData[]
}

