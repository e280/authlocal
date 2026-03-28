
export type Identity = {
	name: string
	root: string
}

export type IdentityTiming = {
	id: string
	timeLastTouched: number
	timeFirstTouched: number
}

export type IdentityDelegation = {
	id: string
	origin: string
	time: number
	expiresAt: number
}

