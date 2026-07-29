
import {Secret} from "../../cryp/types.js"

/** a request for a delegate */
export type Petition = {

	/** describes what this delegate is supposed to do, eg "auth" or "crypt" */
	purpose: string

	/** distinguishes delegates of the same purpose, eg "v1" or a random nonce */
	scope: string

	/** time the delegate proof will expire, in js milliseconds */
	expiresAt?: number
}

/** a delegate keypair is a scoped keypair derived from an identity root */
export type Delegate = {

	/** delegate secret */
	secret: Secret

	/** user's nickname */
	alias: string

	/** proof that this delegate is legit, signed by the user's root */
	proofToken: string
}

