
import {TokenPayload} from "./token.js"

/** crypto keypair */
export type Keypair = {

	/** public key */
	id: string

	/** private key */
	secret: string
}

/** a user's identity */
export type Passport = {

	/** public key (64 hex chars) */
	id: string

	/** private key (64 hex chars) */
	secret: string

	/** human-readable name */
	label: string
}

/** public representation of a user's identity */
export type PassportPlacard = {
	id: string
	label: string
}

/** dehydrated passport data */
export type PassportSeed = {
	label: string
	secret: string
}

/** a login session */
export type Session = {

	/** private key for a login session */
	secret: string

	/** proof for this session */
	proofToken: string
}

/** proof that a session was signed by the user's passport */
export type Proof = {
	scope: "proof"
	sessionId: string
	passport: PassportPlacard
}

/** token payload that contains proof */
export type ProofPayload = {data: Proof} & TokenPayload

/** token payload for a generic claim signed by a session */
export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & TokenPayload

