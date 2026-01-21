
import {Err} from "../utils/err.js"

export type Header = {
	typ: "JWT"
	alg: "EdDSA"
}

export type Payload = Partial<{
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	nbf: number
	jti: string
}>

export type TokenString = string

export type Token<P extends Payload = any> = {
	header: Header
	payload: P
	signature: Uint8Array
}

export type Verifications = {
	atTime?: number | null
	allowedIssuers?: string[]
	allowedAudiences?: string[]
}

export class VerifyError extends Err {}

export type Params = {
	expiresAt?: number
	issuedAt?: number
	notBefore?: number
	audience?: string
	issuer?: string
}

