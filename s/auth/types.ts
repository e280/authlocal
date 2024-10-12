
export type Identity = {
	version: number
	id: string
	name: string
	keys: Keypair
}

export type IdentityFile = {
	identities: Identity[]
}

export type Keypair = {
	private: string
	public: string
}

