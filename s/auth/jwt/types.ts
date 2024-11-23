
export type Header = {
	typ: "JWT"
	alg: "ES256"
}

export type Payload = Partial<{
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	nbf: number
	jti: string
}> & {[key: string]: any}

export type Signature = ArrayBuffer

export type WebToken<P extends Payload = any> = {
	header: Header
	payload: P
	signature: Signature
}

export type VerificationOptions = {
	allowedIssuers?: string[]
	allowedAudiences?: string[]
}

export class VerifyError extends Error {
	name = this.constructor.name
}

export type TokenParams = {
	expiresAt: number
	notBefore?: number
	audience?: string
	issuer?: string
}

