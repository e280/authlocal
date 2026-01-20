
import {hex} from "@e280/stz"
import {Identity} from "./types.js"
import {moniker} from "../moniker/moniker.js"
import {deriveId, deriveSecret} from "../cryp/derive.js"

export async function generateIdentity(label?: string): Promise<Identity> {
	const seed = hex.random(32)
	const secret = await deriveSecret(seed, "id")
	const id = await deriveId(secret)

	return {
		seed,
		keypair: {id, secret},
		profile: {id, label: label || moniker.sigil(id)},
	}
}

