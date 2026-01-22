
import {hex} from "@e280/stz"
import {Identity} from "./types.js"
import {Root} from "../cryp/types.js"
import {purposes} from "./purposes.js"
import {moniker} from "../nomen/moniker/moniker.js"
import {deriveId, deriveSecret} from "../cryp/derive.js"

export async function deriveIdentity(
		root: Root = hex.random(32),
		name?: string,
	): Promise<Identity> {

	const secret = await deriveSecret(root, purposes.id)
	const id = await deriveId(secret)

	return {
		root,
		keypair: {id, secret},
		profile: {id, name: name || moniker.sigil(id)},
	}
}

