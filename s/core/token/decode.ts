
import {Base64url, Txt} from "@e280/stz"
import {TokenHeader, Token, WebToken} from "./types.js"

export function decodeToken<P extends Token>(token: string): WebToken<P> {
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

