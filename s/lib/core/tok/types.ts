
export type TokenHeader = {
	typ: "JWT"
	alg: "EdDSA"
}

export type Payload<P extends {} = {}> = P & Partial<{
	iss: string
	sub: string
	aud: string
	exp: number
	iat: number
	nbf: number
	jti: string
}>

export type TokenString = string

export type WebToken<P extends Payload = any> = {
	header: TokenHeader
	payload: P
	signature: Uint8Array
}

export type TokenVerifications = {
	atTime?: number | null
	allowedIssuers?: string[]
	allowedAudiences?: string[]
}

export type TokenParams = {
	expiresAt?: number
	issuedAt?: number
	notBefore?: number
	audience?: string
	issuer?: string
}

