
import {thumbprint} from "@e280/stz"
import {Identity, Nametag} from "./types.js"
import {generateKeypair} from "../crypto/crypto.js"

export async function generateIdentity(): Promise<Identity> {
	const {id, secret} = await generateKeypair()
	const label = thumbprint.sigil.fromHex(id)
	return {label, id, secret}
}

export function toNametag({id, label}: Identity): Nametag {
	return {id, label}
}

export function dedupeIdentities(identities: Identity[]) {
	const map = new Map(identities.map(ident => [ident.id, ident]))
	return [...map.values()]
}

