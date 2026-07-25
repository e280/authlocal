
import {Id, Secret} from "../cryp/types.js"

/** a request for a delegate */
export type Petition = {
	scope: string
	expiresAt: number
}

/** a delegate keypair is a scoped keypair derived from a viceroy */
export type Delegate = {
	signedBy: Id
	secret: Secret
	alias: string
	proofToken: string
}

/** verifiable claim */
export type Testimony<X extends object> = X & {signedBy: Id}

/** proof certifies that a delegate was signed by a viceroy */
export type Proof = Testimony<{delegateId: Id}>

