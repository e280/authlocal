
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
		let transformed = x
		const probs: string[] = []

		for (const validator of validators) {
			const maybe = validator(transformed)
			if (!maybe.yay) probs.push(...maybe.problems)
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

