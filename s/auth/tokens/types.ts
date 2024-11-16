
import {VerificationOptions} from "./token.js"
import {KeypairData, PubkeyData} from "../types.js"

/** proof that the login commissioned by the passport (signed by the passport) */
export type ProofPayload = {
	exp: number
	iss: string
	aud: string
	jti: string
	data: {
		loginPubkey: PubkeyData
		passportPubkey: PubkeyData
	}
}

/** includes user info and an ephemeral keypair (signed by the passport) */
export type KeysPayload = {
	sub: string // passport thumbprint
	exp: number
	iss: string
	aud: string
	jti: string
	data: {
		name: string
		loginKeypair: KeypairData
	}
}

/** a claim (signed by the login) */
export type ClaimPayload<C> = {
	sub: string // passport thumbprint
	exp: number
	jti: string
	data: C
}

/** federated apps receive these tokens upon a successful login */
export type LoginTokens = {
	proofToken: string
	keysToken: string
}

export type ProofVerification = {allowedAudiences: string[]} & VerificationOptions

