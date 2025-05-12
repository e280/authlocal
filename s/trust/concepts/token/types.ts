
export type TokenHeader = {
	typ: "JWT"
	alg: "EdDSA"
}

export type Token = Partial<{
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	nbf: number
	jti: string
}> & {[key: string]: any}

export type WebToken<P extends Token = any> = {
	header: TokenHeader
	payload: P
	signature: Uint8Array
}

export type TokenVerifications = {
	atTime?: number | null
	allowedIssuers?: string[]
	allowedAudiences?: string[]
}

export class TokenVerifyError extends Error {
	name = this.constructor.name
}

export type TokenParams = {
	expiresAt?: number
	issuedAt?: number
	notBefore?: number
	audience?: string
	issuer?: string
}

