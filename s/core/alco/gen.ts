
import {thumbprint} from "@e280/stz"
import {Identity} from "./types.js"
import {generateKeypair} from "../cryp/gen.js"

export async function generateIdentity(): Promise<Identity> {
	const {id, secret} = await generateKeypair()
	const label = thumbprint.sigil.fromHex(id)
	return {label, id, secret}
}

