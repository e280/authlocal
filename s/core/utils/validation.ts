
export type Ok<X> = {ok: true, item: X}
export type Problem = {ok: false, problem: string}
export type Result<X> = Ok<X> | Problem

export function problem(problem: string): Problem {
	return {ok: false, problem}
}

export function ok<X>(item: X): Ok<X> {
	return {ok: true, item}
}

