
import {Session} from "../session/types.js"
import {Token} from "../token/types.js"

export type SignClaimOptions<C> = {
	claim: C
	session: Session
	appOrigin: string
	expiresAt?: number
	audience?: string
}

export type VerifyClaimOptions = {
	claimToken: string
	appOrigins: string[]
	atTime?: number | null
	allowedAudiences?: string[]
}

/** token payload for a generic claim signed by a session */
export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & Token

