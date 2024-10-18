
export type KeypairJson = {
	public: string
	private: string
}

export type IdentityJson = {
	name: string
	created: number
	thumbprint: string
	keypair: KeypairJson
}

export type IdentitiesJson = {
	format: string
	version: number
	identities: IdentityJson[]
}

