
import {Id, Scope, Secret} from "../cryp/types.js"

/** secret derived from a root, scoped to an app's origin */
export type Viceroy = Secret

/** a request for a delegate */
export type Petition = {
	scope: Scope
	expiresAt: number
}

/** audience and issuer jwt claims for the delegate */
export type Venue = {
	issuer: string
	audience: string
}

/** a delegate keypair is a scoped keypair derived from a viceroy */
export type Delegate = {
	signedBy: Id
	secret: Secret
	proofToken: TestimonyToken
}

/** verifiable claim signed by a viceroy */
export type Testimony<X extends object> = X & {signedBy: Id}
export type TestimonyToken = string

/** proof certifies that a delegate was signed by a viceroy */
export type Proof = Testimony<{delegateId: Id}>

