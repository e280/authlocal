
/** valid value */
export type Yay<X> = {yep: true, value: X}

/** invalid value, was rejected for the given problem strings */
export type Nay = {yep: false, problems: string[]}

/** either a valid value, or a validation failure with problems */
export type Maybe<X> = Yay<X> | Nay

/** succeeded in getting a value */
export function yay<X>(value: X): Yay<X> {
	return {yep: true, value}
}

/** failed to get a value, now we have problems instead */
export function nay(...problems: string[]): Nay {
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

/** a validator can transform values, or return problems */
export type Validator<X> = (x: X) => Maybe<X>

/** validators can be composed together */
export function validator<X>(...validators: Validator<X>[]): Validator<X> {
	return x => {
		let transformed = x
		const probs: string[] = []

		for (const validator of validators) {
			const maybe = validator(transformed)
			if (!maybe.yep) probs.push(...maybe.problems)
			else transformed = maybe.value
		}

		return probs.length
			? nay(...probs)
			: yay(transformed)
	}
}

/** make a validator that returns a problem when the failed callback returns true */
export function deny<X>(problem: string, failed: (x: X) => boolean): Validator<X> {
	return x => (
		failed(x)
			? nay(problem)
			: yay(x)
	)
}

