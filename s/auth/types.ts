
export type PubkeyJson = {
	thumbprint: string
	publicKey: string
}

export type KeypairJson = {
	privateKey: string
} & PubkeyJson

export type PassportJson = {
	keypair: KeypairJson
	name: string
	created: number
}

export type PassportsFileJson = {
	format: string
	version: number
	passports: PassportJson[]
}

