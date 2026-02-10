
import {Id, Keypair, Purpose, Root, Secret} from "../cryp/types.js"

/** private information about an identity */
export type Identity = {
	root: Root
	name: string
	keypair: Keypair
}

/** secret derived from a root, scoped to an app's origin */
export type Viceroy = Secret

/** a request for a delegate */
export type Petition = {
	purpose: Purpose
	expiresAt: number
}

/**  */
export type Delegate = {
	signedBy: Id
	keypair: Keypair
	proofToken: CertToken
}

export type Cert<X extends object> = X & {signedBy: Id}
export type CertToken = string

export type Proof = Cert<{delegateId: Id}>

