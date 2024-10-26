
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

////////////////////////////////////////////////////////////////////////////////

/** includes user info and an ephemeral keypair (signed by the passport) */
export type LoginPayload = {
	exp: number
	aud: string
	iss: string
	data: {
		name: string
		proofToken: string
		loginKeypair: KeypairJson
		passportPubkey: PubkeyJson
	}
}

/** proof that the login pubkey was commissioned by the passport (signed by the passport) */
export type ProofPayload = {
	exp: number
	aud: string
	iss: string
	data: {
		loginPubkey: PubkeyJson
		passportPubkey: PubkeyJson
	}
}

/** a challenge signed by the login keypair */
export type ChallengePayload<C> = {
	exp: number
	data: C
}

