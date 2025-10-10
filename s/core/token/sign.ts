
import {Base64url, Txt} from "@e280/stz"
import {Token} from "./types.js"
import {tokenHeader} from "./header.js"
import {sign} from "../crypto/crypto.js"

export async function signToken<P extends Token>(secret: string, payload: P): Promise<string> {
	const headerBytes = Txt.bytes(JSON.stringify(tokenHeader))
	const headerText = Base64url.string(headerBytes)

	const payloadBytes = Txt.bytes(JSON.stringify(payload))
	const payloadText = Base64url.string(payloadBytes)

	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)
	const signature = Base64url.string(await sign(signingBytes, secret))

	return `${signingText}.${signature}`
}

