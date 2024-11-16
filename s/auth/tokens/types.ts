
import {VerificationOptions} from "../token.js"
import {KeypairData, PubkeyData} from "../types.js"

/** proof that the login commissioned by the passport (signed by the passport) */
export type LoginProofPayload = {
	exp: number
	iss: string
	aud: string
	jti: string
	data: {
		name: string
		loginPubkey: PubkeyData
		passportPubkey: PubkeyData
	}
}

/** a claim (signed by the login) */
export type LoginClaimPayload<C> = {
	sub: string // passport thumbprint
	exp: number
	jti: string
	data: C
}

/** includes user info and an ephemeral keypair (signed by the passport) */
export type LoginKeysPayload = {
	sub: string // passport thumbprint
	exp: number
	iss: string
	jti: string
	data: {
		loginKeypair: KeypairData
	}
}

/** federated apps receive these tokens upon a successful login */
export type LoginTokens = {
	loginProofToken: string
	loginKeysToken: string
}

export type LoginVerification = {allowedAudiences: string[]} & VerificationOptions

