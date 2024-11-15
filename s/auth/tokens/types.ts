
import {KeypairData, PubkeyData} from "../types.js"

/** proof that the login commissioned by the passport (signed by the passport) */
export type ProofPayload = {
	exp: number
	aud: string
	iss: string
	jti: string
	data: {
		loginPubkey: PubkeyData
		passportPubkey: PubkeyData
	}
}

/** a claim (signed by the login) */
export type ClaimPayload<C> = {
	sub: string // passport thumbprint
	exp: number
	jti: string
	data: C
}

/** includes user info and an ephemeral keypair (signed by the passport) */
export type LoginPayload = {
	sub: string // passport thumbprint
	exp: number
	jti: string
	data: {
		name: string
		loginKeypair: KeypairData
	}
}

/** federated apps receive these tokens upon a successful login */
export type LoginSessionTokens = {
	proofToken: string
	loginToken: string
}

