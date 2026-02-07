
/** valid value */
export type Yep<X> = {yep: true, value: X}

/** invalid value, was rejected for the given problem strings */
export type Nah = {yep: false, problems: string[]}

/** either a valid value, or a validation failure with problems */
export type Maybe<X> = Yep<X> | Nah

/** succeeded in getting a value */
export function yep<X>(value: X): Yep<X> {
	return {yep: true, value}
}

/** failed to get a value, now we have problems instead */
export function nah(...problems: string[]): Nah {
	return {yep: false, problems}
}

/** gimmie the problems array, or undefined */
export function problems(maybe: Maybe<unknown>) {
	return maybe.yep
		? undefined
		: maybe.problems
}

/** gimmie the value, or throw an error */
export function yoink<X>(maybe: Maybe<X>) {
	if (!maybe.yep) throw new Error(maybe.problems.join("; "))
	return maybe.value
}

