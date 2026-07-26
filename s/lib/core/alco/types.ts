
import {Id, Secret} from "../cryp/types.js"

/** a request for a delegate */
export type Petition = {

	/** describes what this delegate is supposed to do, eg "login" or "encryption" */
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

	/** user identity public id */
	identityId: Id

	/** user's nickname */
	alias: string

	/** describes what this delegate is supposed to do, eg "login" or "encryption" */
	purpose: string

	/** distinguishes delegates of the same purpose, eg "v1" or a random nonce */
	scope: string

	/** proof that this delegate is legit, signed by the user's root */
	proofToken: string
}

/** proof that a delegate was signed by an identity root */
export type Proof = {
	identityId: Id
	delegateId: Id
}

/** arbitrary attestation signed by a delegate */
export type Testimony<X> = {
	proofToken: string
	data: X
}

