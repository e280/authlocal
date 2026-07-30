
/** options for requesting a standard login session. */
export type SessionOptions = {

	/** request when this login session should expire, in js milliseconds time (delegator may cap this). */
	expiresAt: number

	/** scope used when deriving encryption secret. */
	cryptScope: string
}

