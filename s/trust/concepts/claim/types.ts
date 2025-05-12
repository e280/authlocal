
import {Session} from "../session/types.js"
import {TokenParams, Token} from "../token/types.js"

export type SignClaimOptions<C> = {
	claim: C
	session: Session
	appOrigin: string
} & Omit<TokenParams, "issuer">

export type VerifyClaimOptions = {
	claimToken: string
	appOrigins: string[]
	atTime?: number | null
}

/** token payload for a generic claim signed by a session */
export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & Token

