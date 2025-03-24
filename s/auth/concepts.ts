
import {TokenPayload} from "./token.js"

export type Keypair = {
	id: string
	secret: string
}

export type Passport = {
	id: string
	label: string
	secret: string
}

export type Session = {
	secret: string
	proofToken: string
}

export type Proof = {
	scope: "proof"
	sessionId: string
	passportId: string
	passportLabel: string
}

export type ProofPayload = {data: Proof} & TokenPayload

export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & TokenPayload

