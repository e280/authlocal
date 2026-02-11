
import {base64url, txt} from "@e280/stz"
import {Payload} from "./types.js"
import {tokenHeader} from "./header.js"
import {Secret} from "../cryp/types.js"
import {signBytes} from "../cryp/signing.js"

export function signToken<P extends Payload>(secret: Secret, payload: P): string {
	const headerBytes = txt.toBytes(JSON.stringify(tokenHeader))
	const headerText = base64url.fromBytes(headerBytes)

	const payloadBytes = txt.toBytes(JSON.stringify(payload))
	const payloadText = base64url.fromBytes(payloadBytes)

	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)
	const signature = base64url.fromBytes(signBytes(secret, signingBytes))

	return `${signingText}.${signature}`
}

