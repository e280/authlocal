
export type TokenHeader = {
	typ: "JWT"
	alg: "ES256"
}

export type TokenPayload = Partial<{
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	nbf: number
	jti: string
}> & {[key: string]: any}

export type TokenSignature = ArrayBuffer

export type WebToken<P extends TokenPayload = any> = {
	header: TokenHeader
	payload: P
	signature: TokenSignature
}

export type TokenVerifyOptions = {
	allowedIssuers?: string[]
	allowedAudiences?: string[]
}

export class TokenVerifyError extends Error {
	name = this.constructor.name
}

export type TokenParams = {
	expiresAt: number
	notBefore?: number
	audience?: string
	issuer?: string
}

