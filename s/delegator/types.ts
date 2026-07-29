
import {Id} from "../lib/core/cryp/types.js"
import {Payload} from "../lib/core/tok/types.js"
import {Proof} from "../lib/core/alco/proof/types.js"

export type Identity = {
	root: string
	alias: string
}

export type IdentityTiming = {
	id: Id
	timeLastTouched: number
	timeFirstTouched: number
}

export type DelegationRecord = {
	id: Id
	alias: string
	time: number
	app: string
	proofPayloads: Payload<{proof: Proof}>[]
}

