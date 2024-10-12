
export type Identity = {
	version: number
	id: string
	name: string
	keys: AuthKeys
}

export type IdentityFile = {
	identities: Identity[]
}

export type AuthKeys = {
	cryption: Keypair
	signature: Keypair
}

export type Keypair = {
	private: string
	public: string
}

