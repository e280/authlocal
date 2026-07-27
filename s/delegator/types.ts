
import {Id} from "../lib/core/cryp/types.js"
import {Delegate} from "../lib/core/alco/types.js"

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
	delegates: Delegate[]
}

