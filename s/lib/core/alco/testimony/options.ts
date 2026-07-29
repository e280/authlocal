
/** options for signing a testimony token */
export type TestimonyOptions = {

	/** js time when this testimony is signed */
	atTime?: number

	/** intended recipients of this testimony (your server or something) */
	audience?: string

	/** js time when this testimony expires */
	expiresAt?: number
}

