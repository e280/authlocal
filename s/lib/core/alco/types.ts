
import {Id, Secret} from "../cryp/types.js"

/** a request for a delegate */
export type Petition = {

	/** describes what this delegate is supposed to do, eg "auth" or "crypt" */
	purpose: string

	/** distinguishes delegates of the same purpose, eg "v1" or a random nonce */
	scope: string

	/** request for when we'd like the delegate proof to expire, in js milliseconds (delegator will cap this) */
	expiresAt: number
}

/** a delegate keypair is a scoped keypair derived from an identity root */
export type Delegate = {

	/** delegate secret */
	secret: Secret

	/** proof that this delegate is legit, signed by the user's root */
	proofToken: string
}

/** proof that a delegate was signed by an identity root */
export type Proof = {

	/** delegate public key */
	delegateId: Id

	/** user identity public id (this is not the delegateId) */
	id: Id

	/** user's nickname */
	alias: string

	/** describes what this delegate is supposed to do, eg "auth" or "crypt" */
	purpose: string

	/** distinguishes delegates of the same purpose, eg "v1" or a random nonce */
	scope: string
}

/** arbitrary attestation signed by a delegate */
export type TestimonySource<X> = {
	proofToken: string
	data: X
}

/** arbitrary attestation, signed by a delegate, and verified all the way back to the root identity */
export type Testimony<X> = {
	data: X
	proof: Proof
}

