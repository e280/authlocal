
/** a user's identity */
export type Identity = {

	/** nickname associated with this identity */
	label: string

	/** public key (64-length hex string) */
	id: string

	/** private key (64-length hex string) */
	secret: string
}

/** public representation of a user's identity */
export type Nametag = {
	id: string
	label: string
}

