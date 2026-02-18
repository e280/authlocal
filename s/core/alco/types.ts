
import {Id, Scope, Secret} from "../cryp/types.js"

/** secret derived from a root, scoped to an app's origin */
export type Viceroy = Secret

/** a request for a delegate */
export type Petition = {
	scope: Scope
	issuer: string // TODO i think we remove this?
	audience: string
	expiresAt: number
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

