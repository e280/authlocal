
import {Payload} from "../../../tok/types.js"

/** arbitrary attestation, signed by a delegate */
export type UnverifiedClaimPayload<X> = Payload<{
	claim: X
	proofToken: string
}>

