
import {Id} from "../../cryp/types.js"

/** proof that a delegate was signed by an identity secret */
export type Proof = {

	/** delegate public key */
	delegateId: Id

	/** user identity public id (this is not the delegateId) */
	id: Id

	/** describes what this delegate is supposed to do, eg "auth" or "crypt" */
	purpose: string

	/** distinguishes delegates of the same purpose, eg "v1" or a random nonce */
	scope: string
}

