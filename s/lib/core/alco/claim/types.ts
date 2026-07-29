
import {Proof} from "../proof/types.js"

/** arbitrary attestation signed by a delegate */
export type ClaimSource<X> = {
	proofToken: string
	data: X
}

/** arbitrary attestation, signed by a delegate, and verified all the way back to the root identity */
export type Claim<X> = {
	data: X
	proof: Proof
}

