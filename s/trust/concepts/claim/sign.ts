
import {Hex} from "@e280/stz"
import {signToken} from "../token/sign.js"
import {decodeToken} from "../token/decode.js"
import {tokentime} from "../token/tokentime.js"
import {ProofPayload} from "../session/types.js"
import {ClaimPayload, SignClaimOptions} from "./types.js"

export async function signClaim<C>({claim, session, appOrigin, audience, expiresAt}: SignClaimOptions<C>) {
	const proof = decodeToken<ProofPayload>(session.proofToken).payload.data
	return signToken<ClaimPayload<C>>(session.secret, {
		jti: Hex.random(32),
		exp: tokentime.maybe(expiresAt),
		sub: proof.nametag.id,
		aud: audience,
		iss: appOrigin,
		data: {
			claim,
			proofToken: session.proofToken,
		},
	})
}

