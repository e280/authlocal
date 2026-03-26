
export type Yay<X> = {yay: true, value: X}
export type Nay = {yay: false, problems: string[]}
export type Maybe<X> = Yay<X> | Nay

export function yay<X>(value: X): Yay<X> {
	return {yay: true, value}
}
yay.is = <X>(maybe: Maybe<X>): maybe is Yay<X> => maybe.yay
yay.get = <X>(maybe: Maybe<X>) => maybe.yay ? maybe.value : undefined
yay.require = <X>(maybe: Maybe<X>) => {
	if (!maybe.yay) throw new Error(maybe.problems.join("; "))
	return maybe.value
}

export function nay(...problems: string[]): Nay {
	return {yay: false, problems}
}
nay.is = (maybe: Maybe<any>): maybe is Nay => !maybe.yay
nay.problems = (maybe: Maybe<unknown>) => maybe.yay ? undefined : maybe.problems

/** a validator can transform values, or return problems */
export type Validator<X> = (x: X) => Maybe<X>

/** validators can be composed together */
export function validator<X>(...validators: Validator<X>[]): Validator<X> {
	return x => {
		let failures = 0
		let transformed = x
		const probs: string[] = []

		for (const validator of validators) {
			const maybe = validator(transformed)
			if (!maybe.yay) {
				failures++
				probs.push(...maybe.problems)
			}
			else transformed = maybe.value
		}

		return (failures > 0)
			? nay(...probs)
			: yay(transformed)
	}
}

/** make a validator that returns a problem when the failed callback returns true */
export function deny<X>(denied: string, failed: (x: X) => boolean): Validator<X> {
	return x => (
		failed(x)
			? nay(`denied: ${denied}`)
			: yay(x)
	)
}

/** make a validator that returns a problem when the success callback returns false */
export function allow<X>(failed: string | null, success: (x: X) => boolean): Validator<X> {
	return x => (
		success(x)
			? yay(x)
			: (failed ? nay(`failed: ${failed}`) : nay())
	)
}

/** compose validators with an 'or' relationship, only one needs to succeed */
export function fork<X>(...validators: Validator<X>[]): Validator<X> {
	return x => {
		const probs: string[] = []

		for (const validator of validators) {
			const maybe = validator(x)
			if (maybe.yay) return maybe
			else probs.push(...maybe.problems)
		}

		return nay(...probs)
	}
}

