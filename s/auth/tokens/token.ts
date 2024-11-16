
import {Base64url, hexId, Text} from "@benev/slate"
import {CryptoConstants} from "../crypto-constants.js"

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

export type Requirements = {
	expiresAt: number
	notBefore?: number
	audience?: string
	issuer?: string
}

export class Token {
	static header: Header = Object.freeze({typ: "JWT", alg: "ES256"})
	static toJsTime = (t: number) => t * 1000
	static fromJsTime = (t: number) => t / 1000

	static requirements = (r: Requirements) => ({
		jti: hexId(),
		iat: Date.now(),
		exp: Token.fromJsTime(r.expiresAt),
		nbf: r.notBefore,
		iss: r.issuer,
		aud: r.audience,
	})

	static async sign<P extends Payload>(privateKey: CryptoKey, payload: P): Promise<string> {
		const headerBytes = Text.bytes(JSON.stringify(Token.header))
		const headerText = Base64url.string(headerBytes)

		const payloadBytes = Text.bytes(JSON.stringify(payload))
		const payloadText = Base64url.string(payloadBytes)

		const signingText = `${headerText}.${payloadText}`
		const signingBytes = new TextEncoder().encode(signingText)
		const signature = Base64url.string(
			new Uint8Array(
				await crypto.subtle.sign(
					CryptoConstants.algos.signing,
					privateKey,
					signingBytes,
				)
			)
		)
		return `${signingText}.${signature}`
	}

	static decode<P extends Payload>(token: string): WebToken<P> {
		const [headerText, payloadText, signatureText] = token.split(".")
		if (!headerText || !payloadText || !signatureText)
			throw new Error("invalid jwt structure")

		const headerBytes = Base64url.bytes(headerText)
		const headerJson = Text.string(headerBytes)
		const header: Header = JSON.parse(headerJson)

		const payloadBytes = Base64url.bytes(payloadText)
		const payloadJson = Text.string(payloadBytes)
		const payload: P = JSON.parse(payloadJson)

		const signature = Base64url.bytes(signatureText).buffer
		return {header, payload, signature}
	}

	static async verify<P extends Payload>(
			publicKey: CryptoKey,
			token: string,
			options: VerificationOptions = {},
		): Promise<P> {

		const [headerText, payloadText] = token.split(".")
		const {payload, signature} = Token.decode<P>(token)
		const signingInput = `${headerText}.${payloadText}`
		const signingInputBytes = new TextEncoder().encode(signingInput)

		const isValid = await crypto.subtle.verify(
			CryptoConstants.algos.signing,
			publicKey,
			signature,
			signingInputBytes
		)

		if (!isValid)
			throw new VerifyError("token signature invalid")

		if (payload.exp) {
			const expiry = Token.toJsTime(payload.exp)
			if (Date.now() > expiry)
				throw new VerifyError("token expired")
		}

		if (payload.nbf) {
			const notBefore = Token.toJsTime(payload.nbf)
			if (Date.now() < notBefore)
				throw new VerifyError("token not ready")
		}

		if (options.allowedIssuers) {
			if (!payload.iss)
				throw new VerifyError(`required iss (issuer) is missing`)
			if (!options.allowedIssuers.includes(payload.iss))
				throw new VerifyError(`invalid iss (issuer) "${payload.iss}"`)
		}

		if (options.allowedAudiences) {
			if (!payload.aud)
				throw new VerifyError(`required aud (audience) is missing`)
			if (!options.allowedAudiences.includes(payload.aud))
				throw new VerifyError(`invalid aud (audience) "${payload.aud}"`)
		}

		if (payload.aud && !options.allowedAudiences)
			throw new VerifyError(`allowedAudiences verification option was not provided, but is required because the token included "aud"`)

		return payload
	}
}

