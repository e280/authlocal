
import {KeypairJson, PubkeyJson} from "../types.js"

/** includes user info and an ephemeral keypair (signed by the passport) */
export type LoginPayload = {
	exp: number
	aud: string
	iss: string
	jti: string
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
	jti: string
	data: {
		loginPubkey: PubkeyJson
		passportPubkey: PubkeyJson
	}
}

/** a challenge signed by the login keypair */
export type ChallengePayload<C> = {
	sub: string // passport thumbprint
	exp: number
	jti: string
	data: C
}

