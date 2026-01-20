
import {base64url, txt} from "@e280/stz"
import {Header, Payload, Token} from "./types.js"

export function decode<P extends Payload>(token: string): Token<P> {
	const [headerText, payloadText, signatureText] = token.split(".")
	if (!headerText || !payloadText || !signatureText)
		throw new Error("invalid jwt structure")

	const headerBytes = base64url.toBytes(headerText)
	const headerJson = txt.fromBytes(headerBytes)
	const header: Header = JSON.parse(headerJson)

	const payloadBytes = base64url.toBytes(payloadText)
	const payloadJson = txt.fromBytes(payloadBytes)
	const payload: P = JSON.parse(payloadJson)

	const signature = base64url.toBytes(signatureText)
	return {header, payload, signature}
}

