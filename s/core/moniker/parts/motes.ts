
import {prefixes, prefixIndex} from "./prefixes.js"
import {suffixes, suffixIndex} from "./suffixes.js"

export function *motesFromBytes(buffer: Iterable<number>) {
	for (const [a, b] of pairwise(buffer))
		yield moteFromPair(a, b)
}

export function *motesToBytes(motes: Iterable<string>) {
	for (const mote of motes) {
		const [a, b] = moteToPair(mote)
		yield a
		yield b
	}
}

export function moteFromPair(a: number, b: number) {
	return prefixes.require(a) + suffixes.require(b)
}

export function moteToPair(mote: string) {
	const prefix = mote.slice(0, 3)
	const suffix = mote.slice(3, 6)
	return [
		prefixIndex.require(prefix),
		suffixIndex.require(suffix),
	] as [number, number]
}

function *pairwise(buffer: Iterable<number>) {
	let a: number | null = null

	for (const byte of buffer) {
		if (a === null) a = byte
		else {
			yield [a, byte] as [number, number]
			a = null
		}
	}
}

