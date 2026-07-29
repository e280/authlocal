
import {Proof} from "../../proof/types.js"

/** verified attestation, signed by a delegate */
export type VerifiedClaimPayload<X> = {
	claim: X
	proof: Proof
}

