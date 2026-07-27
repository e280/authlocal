
import {Maybe, nay, yay} from "@e280/stz"
import {Proof} from "./types.js"
import {Payload} from "../tok/types.js"
import {consts} from "../../../consts.js"
import {validateAlias} from "./validation.js"
import {verifyToken} from "../tok/verify-token.js"
import {decodeToken} from "../tok/decode-token.js"

export function verifyProof(proofToken: string, options: {
		allowedApps: string[]
		allowedPurposes?: string[]
		allowedScopes?: string[]
		allowedDelegators?: string[]
		atTime?: number
	}): Maybe<Proof> {

	const {allowedPurposes = Object.values(consts.purposes)} = options
	const decoded = decodeToken<Payload<{proof: Proof}>>(proofToken)

	const maybePayload = verifyToken<Payload<{proof: Proof}>>(
		decoded.payload.proof.id,
		proofToken,
		{
			atTime: options.atTime,
			allowedIssuers: options.allowedDelegators,
			allowedAudiences: options.allowedApps,
		},
	)

	if (!maybePayload.yay)
		return maybePayload

	const {proof} = maybePayload.value
	
	if (!allowedPurposes.includes(proof.purpose))
		return nay(`purpose not allowed "${proof.purpose}"`)

	if (options.allowedScopes && !options.allowedScopes.includes(proof.scope))
		return nay(`scope not allowed "${proof.scope}"`)

	const maybeAlias = validateAlias(proof.alias)
	if (!maybeAlias.yay)
		return maybeAlias

	return yay(proof)
}

