
export type Identity = {
	version: number
	keys: Keypair
	thumbprint: string
	name: string
	created: number
}

export type IdentityFile = {
	version: number
	identities: Identity[]
}

export type Keypair = {
	private: string
	public: string
}

