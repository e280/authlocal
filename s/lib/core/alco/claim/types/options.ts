
/** options for signing a claim token */
export type ClaimOptions = {

	/** js time when this claim is signed */
	atTime?: number

	/** intended recipients of this claim (your server or something) */
	audience?: string

	/** js time when this claim expires */
	expiresAt?: number
}

