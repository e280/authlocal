
/** options for verifying a claim token */
export type ClaimVerifications = {

	/** your frontend app origins */
	allowedIssuers: string[]

	/** js time of verification time (defaults to Date.now()) */
	atTime?: number

	/** maximum age of the claim token */
	maxAge?: number

	/** maximum age of the proof token (defaults to 30 days) */
	maxProofAge?: number

	/** intended recipients of this claim (your server origin or something) */
	allowedAudiences?: string[]

	/** delegators like "https://authlocal.org" */
	allowedDelegators?: string[]

	/** delegate purposes (defaults to `["auth"]`) */
	allowedPurposes?: string[]

	/** delegate scope */
	allowedScopes?: string[]
}

