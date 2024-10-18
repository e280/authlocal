
export type KeypairJson = {
	public: string
	private: string
}

export type IdentityJson = {
	keypair: KeypairJson
	name: string
	created: number
}

export type IdentitiesJson = {
	format: string
	version: number
	identities: IdentityJson[]
}

