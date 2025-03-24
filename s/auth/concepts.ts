
import {TokenPayload} from "./jwt.js"

export type Keypair = {
	id: string
	secret: string
}

export type Passport = {
	id: string
	secret: string
	label: string | null
}

export type Session = {
	secret: string
	proofToken: string
}

export type Proof = {
	sessionId: string
	passportId: string
}

export type ProofPayload = {data: Proof} & TokenPayload

export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & TokenPayload

