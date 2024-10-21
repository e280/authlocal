
export type PubkeyJson = {
	thumbprint: string
	publicKey: string
}

export type KeypairJson = {
	privateKey: string
} & PubkeyJson

export type IdentityJson = {
	keypair: KeypairJson
	name: string
	created: number
}

export type IdfileJson = {
	format: string
	version: number
	identities: IdentityJson[]
}

export type Access = {
	thumbprint: string
	publicKey: string
	name: string
	expiry: number
	audience: string
}

export type AccessJwtPayload = {
	sub: string
	aud: string
	exp: number
	data: {name: string, publicKey: string}
}

