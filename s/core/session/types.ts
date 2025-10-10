
import {Token} from "../token/types.js"
import {SignClaimOptions} from "../claim/types.js"
import {Identity, Nametag} from "../identity/types.js"

export type VerifyLoginOptions = {session: Session, appOrigins: string[]}
export type LoginSignClaimOptions<C> = Omit<SignClaimOptions<C>, "session" | "appOrigin">

/** a login session */
export type Session = {

	/** private key for a login session */
	secret: string

	/** proof for this session */
	proofToken: string
}

export type GenerateSessionOptions = {
	expiresAt: number
	identity: Identity
	appOrigin: string
	authorityOrigin: string
}

/** proof that a session was signed by the user's identity */
export type Proof = {
	sessionId: string
	nametag: Nametag
}

export type SignProofOptions = {
	identitySecret: string
	expiresAt: number
	proof: Proof
	appOrigin: string
	authorityOrigin: string
}

export type VerifyProofOptions = {
	proofToken: string
	appOrigins: string[]
	atTime?: number | null
}

/** token payload that contains proof */
export type ProofPayload = {
	data: Proof
	exp: number
	sub: string
	iss: string
	aud: string
} & Token

