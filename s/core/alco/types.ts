
import {Id, Keypair, Root} from "../cryp/types.js"

/** public information about an identity */
export type Profile = {
	id: Id
	label: string
}

/** private keypair that identifies a user */
export type Identity = {
	root: Root
	keypair: Keypair
	profile: Profile
}

