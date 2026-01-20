
import {Id, Keypair, Root, Secret} from "../cryp/types.js"

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

/** a successful login */
export type Session = {

	/** private key for this specific session */
	secret: Secret

	/** proves that this session is legit */
	proofToken: string

	/** derived secrets as requested from this login */
	secrets: Secret[]
}

/** proof that a session was signed by the user's identity */
export type Proof = {
	sessionId: Id
	profile: Profile
}

