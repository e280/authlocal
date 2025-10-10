
import {base64url, txt} from "@e280/stz"
import {Token} from "./types.js"
import {tokenHeader} from "./header.js"
import {sign} from "../crypto/crypto.js"

export async function signToken<P extends Token>(secret: string, payload: P): Promise<string> {
	const headerBytes = txt.toBytes(JSON.stringify(tokenHeader))
	const headerText = base64url.fromBytes(headerBytes)

	const payloadBytes = txt.toBytes(JSON.stringify(payload))
	const payloadText = base64url.fromBytes(payloadBytes)

	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)
	const signature = base64url.fromBytes(await sign(signingBytes, secret))

	return `${signingText}.${signature}`
}

