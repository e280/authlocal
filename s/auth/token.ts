
import {Base64url, Hex, Txt} from "@e280/stz"
import {signMessage, verifyMessage} from "./crypto.js"

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
}> & {[key: string]: any}

export type WebToken<P extends TokenPayload = any> = {
	header: TokenHeader
	payload: P
	signature: Uint8Array
}

export type TokenVerifications = {
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

export class Token {
	static header: TokenHeader = Object.freeze({typ: "JWT", alg: "EdDSA"})
	static toJsTime = (t: number) => t * 1000
	static fromJsTime = (t: number) => t / 1000

	static params = (r: TokenParams) => ({
		jti: Hex.random(32),
		iat: Date.now(),
		exp: Token.fromJsTime(r.expiresAt),
		nbf: r.notBefore,
		iss: r.issuer,
		aud: r.audience,
	})

	static async sign<P extends TokenPayload>(secret: string, payload: P): Promise<string> {
		const headerBytes = Txt.bytes(JSON.stringify(Token.header))
		const headerText = Base64url.string(headerBytes)

		const payloadBytes = Txt.bytes(JSON.stringify(payload))
		const payloadText = Base64url.string(payloadBytes)

		const signingText = `${headerText}.${payloadText}`
		const signingBytes = new TextEncoder().encode(signingText)
		const signature = Base64url.string(await signMessage(signingBytes, secret))

		return `${signingText}.${signature}`
	}

	static decode<P extends TokenPayload>(token: string): WebToken<P> {
		const [headerText, payloadText, signatureText] = token.split(".")
		if (!headerText || !payloadText || !signatureText)
			throw new Error("invalid jwt structure")

		const headerBytes = Base64url.bytes(headerText)
		const headerJson = Txt.string(headerBytes)
		const header: TokenHeader = JSON.parse(headerJson)

		const payloadBytes = Base64url.bytes(payloadText)
		const payloadJson = Txt.string(payloadBytes)
		const payload: P = JSON.parse(payloadJson)

		const signature = Base64url.bytes(signatureText)
		return {header, payload, signature}
	}

	static expiresAt(token: string) {
		const {exp} = Token.decode(token).payload
		return exp === undefined
			? undefined
			: Token.toJsTime(exp)
	}

	static async verify<P extends TokenPayload>(
			id: string,
			token: string,
			options: TokenVerifications = {},
		): Promise<P> {

		const [headerText, payloadText] = token.split(".")
		const {payload, signature} = Token.decode<P>(token)
		const signingText = `${headerText}.${payloadText}`
		const signingBytes = new TextEncoder().encode(signingText)

		const isValid = await verifyMessage(signingBytes, signature, id)

		if (!isValid)
			throw new TokenVerifyError("token signature invalid")

		if (payload.exp) {
			const expiresAt = Token.toJsTime(payload.exp)
			if (Date.now() > expiresAt)
				throw new TokenVerifyError("token expired")
		}

		if (payload.nbf) {
			const notBefore = Token.toJsTime(payload.nbf)
			if (Date.now() < notBefore)
				throw new TokenVerifyError("token not ready")
		}

		if (options.allowedIssuers) {
			if (!payload.iss)
				throw new TokenVerifyError(`required iss (issuer) is missing`)
			if (!options.allowedIssuers.includes(payload.iss))
				throw new TokenVerifyError(`invalid iss (issuer) "${payload.iss}"`)
		}

		if (options.allowedAudiences) {
			if (!payload.aud)
				throw new TokenVerifyError(`required aud (audience) is missing`)
			if (!options.allowedAudiences.includes(payload.aud))
				throw new TokenVerifyError(`invalid aud (audience) "${payload.aud}"`)
		}

		if (payload.aud && !options.allowedAudiences)
			throw new TokenVerifyError(`allowedAudiences verification option was not provided, but is required because the token included "aud"`)

		return payload
	}
}

