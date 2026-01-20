
import {base64url, txt} from "@e280/stz"
import {cryp} from "../index.js"
import {Payload} from "./types.js"
import {header} from "./header.js"
import {Secret} from "../cryp/types.js"

export async function sign<P extends Payload>(secret: Secret, payload: P): Promise<string> {
	const headerBytes = txt.toBytes(JSON.stringify(header))
	const headerText = base64url.fromBytes(headerBytes)

	const payloadBytes = txt.toBytes(JSON.stringify(payload))
	const payloadText = base64url.fromBytes(payloadBytes)

	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)
	const signature = base64url.fromBytes(await cryp.sign(secret, signingBytes))

	return `${signingText}.${signature}`
}

