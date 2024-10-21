
import {base64} from "../../../tools/base64.js"
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
}>

export type Signature = ArrayBuffer

export type Jwt<P extends Payload = any> = {
	header: Header
	payload: P
	signature: Signature
}

export class JsonWebToken {
	static header: Header = Object.freeze({typ: "JWT", alg: "ES256"})
	static toJsTime = (t: number) => t * 1000
	static fromJsTime = (t: number) => t / 1000

	static async sign<P extends Payload>(privateKey: CryptoKey, payload: P): Promise<string> {
		const headerText = base64.url.from.text(JSON.stringify(JsonWebToken.header))
		const payloadText = base64.url.from.text(JSON.stringify(payload))
		const signingText = `${headerText}.${payloadText}`
		const signingBytes = new TextEncoder().encode(signingText)
		const signature = base64.url.from.buffer(
			await crypto.subtle.sign(
				CryptoConstants.algos.signing,
				privateKey,
				signingBytes,
			)
		)
		return `${signingText}.${signature}`
	}

	static decode<P extends Payload>(token: string): Jwt<P> {
		const [headerText, payloadText, signatureText] = token.split(".")
		if (!headerText || !payloadText || !signatureText)
			throw new Error("invalid jwt structure")
		const header: Header = JSON.parse(base64.url.to.text(headerText))
		const payload: P = JSON.parse(base64.url.to.text(payloadText))
		const signature = base64.url.to.buffer(signatureText)
		return {header, payload, signature}
	}

	static async verify<P extends Payload>(publicKey: CryptoKey, token: string): Promise<P> {
		const [headerText, payloadText] = token.split(".")
		const {payload, signature} = JsonWebToken.decode<P>(token)
		const signingInput = `${headerText}.${payloadText}`
		const signingInputBytes = new TextEncoder().encode(signingInput)

		const isValid = await crypto.subtle.verify(
			CryptoConstants.algos.signing,
			publicKey,
			signature,
			signingInputBytes
		)

		if (!isValid)
			throw new Error("token signature invalid")

		if (payload.exp) {
			const expiry = JsonWebToken.toJsTime(payload.exp)
			if (Date.now() > expiry)
				throw new Error("token expired")
		}

		if (payload.nbf) {
			const notBefore = JsonWebToken.toJsTime(payload.nbf)
			if (Date.now() < notBefore)
				throw new Error("token not ready")
		}

		return payload
	}
}

