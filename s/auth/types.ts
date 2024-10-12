
export type Identity = {
	name: string
	publicKey: string
	privateKey: string
}

export type IdentityFile = {
	identities: Identity[]
}

