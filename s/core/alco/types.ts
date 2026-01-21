
import {Id, Keypair, Purpose, Root} from "../cryp/types.js"

/** public information about an identity */
export type Profile = {
	id: Id
	name: string
}

/** private information about an identity */
export type Identity = {
	root: Root
	keypair: Keypair
	profile: Profile
}

/** apps can request various things */
export type Petition = {

	/** how many milliseconds we're asking for this stuff to live */
	lifespan: number

	/** purpose strings for each delegate keypair */
	delegates: Purpose[]
}

/** unverified/unprocessed grant */
export type Offer = {
	expiresAt: number
	profileCert: CertToken
	delegates: Delegate[]
}

/** verified information */
export type Grant = {
	expiresAt: number
	profile: Profile
	profileCert: CertToken
	delegates: Delegate[]
}

/** root-derived keypair, with certified pubkey */
export type Delegate = {
	keypair: Keypair
	proofCert: CertToken
}

export type CertToken = string
export type Cert<X extends object> = X & {identityId: Id}

