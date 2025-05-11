
import {Thumbprint} from "@e280/stz"
import {generateKeypair} from "./crypto.js"

/** a user's identity */
export type Identity = {

	/** nickname associated with this identity */
	label: string

	/** public key (64-length hex string) */
	id: string

	/** private key (64-length hex string) */
	secret: string
}

/** public representation of a user's identity */
export type Nametag = {
	id: string
	label: string
}

export async function generateIdentity(): Promise<Identity> {
	const {id, secret} = await generateKeypair()
	const label = Thumbprint.sigil.fromHex(id)
	return {label, id, secret}
}

export function toNametag({id, label}: Identity): Nametag {
	return {id, label}
}

export function dedupeIdentities(identities: Identity[]) {
	const map = new Map(identities.map(ident => [ident.id, ident]))
	return [...map.values()]
}

