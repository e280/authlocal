
/** options for verifying a testimony token */
export type TestimonyVerifications = {

	/** app origins */
	allowedIssuers: string[]

	/** js time of verification time (for comparison with expiry) */
	atTime?: number

	/** maximum age of the testimony token */
	maxAge?: number

	/** maximum age of the proof token */
	maxProofAge?: number

	/** intended recipients of this testimony (your server or something) */
	allowedAudiences?: string[]

	/** delegators like "https://authlocal.org" */
	allowedDelegators?: string[]

	/** delegate purposes like "auth" */
	allowedPurposes?: string[]

	/** delegate scope */
	allowedScopes?: string[]
}

