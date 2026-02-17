
import {Id, Scope, Secret} from "../cryp/types.js"

/** secret derived from a root, scoped to an app's origin */
export type Viceroy = Secret

/** a request for a delegate */
export type Petition = {
	scope: Scope
	expiresAt: number
}

/** a delegate keypair is a scoped keypair derived from a viceroy */
export type Delegate = {
	signedBy: Id
	secret: Secret
	proofToken: AttestationToken
}

/** verifiable claim signed by a viceroy */
export type Attestation<X extends object> = X & {signedBy: Id}
export type AttestationToken = string

/** proof certifies that a delegate was signed by a viceroy */
export type Proof = Attestation<{delegateId: Id}>

