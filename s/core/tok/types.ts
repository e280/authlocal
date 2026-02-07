
import {Err} from "../utils/err.js"

export type TokenHeader = {
	typ: "JWT"
	alg: "EdDSA"
}

export type TokenPayload = Partial<{
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	nbf: number
	jti: string
}>

export type TokenString = string

export type Token<P extends TokenPayload = any> = {
	header: TokenHeader
	payload: P
	signature: Uint8Array
}

export type TokenVerifications = {
	atTime?: number | null
	allowedIssuers?: string[]
	allowedAudiences?: string[]
}

export class TokenVerifyErr extends Err {}

export type TokenParams = {
	expiresAt?: number
	issuedAt?: number
	notBefore?: number
	audience?: string
	issuer?: string
}

