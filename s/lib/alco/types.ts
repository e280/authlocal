
import {Id, Secret} from "../cryp/types.js"

/** a request for a delegate */
export type Petition = {
	scope: string
	expiresAt: number
}

/** describes to whom a delegate is for, and from whence it came */
export type Venue = {

	/** origin of the app that sends petitions (eg, "https://e280.org") */
	appOrigin: string

	/** origin of the authority that signs delegates (eg, "https://authlocal.org") */
	authorityOrigin: string
}

/** a delegate keypair is a scoped keypair derived from a viceroy */
export type Delegate = {
	signedBy: Id
	secret: Secret
	proofToken: string
}

/** verifiable claim */
export type Testimony<X extends object> = X & {signedBy: Id}

/** proof certifies that a delegate was signed by a viceroy */
export type Proof = Testimony<{delegateId: Id}>

