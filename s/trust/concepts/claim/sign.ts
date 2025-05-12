
import {signToken} from "../token/sign.js"
import {tokenTool} from "../token/tool.js"
import {decodeToken} from "../token/decode.js"
import {ProofPayload} from "../session/types.js"
import {ClaimPayload, SignClaimOptions} from "./types.js"

export async function signClaim<C>({claim, session, appOrigin, ...params}: SignClaimOptions<C>) {
	const proof = decodeToken<ProofPayload>(session.proofToken).payload.data
	return signToken<ClaimPayload<C>>(session.secret, {
		...tokenTool.params({
			...params,

			// issuer must be the app origin
			issuer: appOrigin,
		}),
		sub: proof.nametag.id,
		data: {
			claim,
			proofToken: session.proofToken,
		},
	})
}

