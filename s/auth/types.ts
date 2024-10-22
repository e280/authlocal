
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

export type AccessJwtPayload = {
	sub: string
	aud: string
	exp: number
	data: {name: string, publicKey: string}
}

export type Access = {
	name: string
	thumbprint: string
	publicKey: string
	expiry: number
	audience: string
}

export type Login = {token: string} & Access

