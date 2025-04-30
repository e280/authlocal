
import {TokenPayload} from "./token.js"

export const passportVersion = 1

export type Keypair = {
	id: string
	secret: string
}

export type Passport = {
	id: string
	label: string
	secret: string
	version: number
	issued: number
}

export type PassportPlacard = {
	id: string
	label: string
}

export type Session = {
	secret: string
	proofToken: string
}

export type Proof = {
	scope: "proof"
	sessionId: string
	passport: PassportPlacard
}

export type ProofPayload = {data: Proof} & TokenPayload

export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & TokenPayload

