
import {Id, Scope, Secret} from "../cryp/types.js"

/** origin of the authority that signs delegates (eg, "https://authlocal.org") */
export type Delegator = string

/** origin of the app that sends petitions (eg, "https://e280.org") */
export type Petitioner = string

/** secret derived from a root, scoped to an app's origin */
export type Viceroy = Secret

/** a request for a delegate */
export type Petition = {
	scope: Scope
	expiresAt: number
}

/** describes to whom a delegate is for, and from whence it came */
export type Venue = {
	delegator: Delegator
	petitioner: Petitioner
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

