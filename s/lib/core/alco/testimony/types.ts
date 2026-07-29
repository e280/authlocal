
import {Proof} from "../proof/types.js"

/** arbitrary attestation signed by a delegate */
export type TestimonySource<X> = {
	proofToken: string
	data: X
}

/** arbitrary attestation, signed by a delegate, and verified all the way back to the root identity */
export type Testimony<X> = {
	data: X
	proof: Proof
}

