
import {Identity, Profile} from "./types.js"

export function toProfile({id, label}: Identity): Profile {
	return {id, label}
}

export function dedupeIdentities(identities: Identity[]) {
	const map = new Map(identities.map(ident => [ident.id, ident]))
	return [...map.values()]
}

