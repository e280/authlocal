
import {hex} from "@e280/stz"
import {Identity} from "./types.js"
import {Root} from "../cryp/types.js"
import {moniker} from "../moniker/moniker.js"
import {deriveId, deriveSecret} from "../cryp/derive.js"

export async function deriveIdentity(
		root: Root = hex.random(32),
		label?: string,
	): Promise<Identity> {

	const secret = await deriveSecret(root, "id")
	const id = await deriveId(secret)

	return {
		root,
		keypair: {id, secret},
		profile: {id, label: label || moniker.sigil(id)},
	}
}

