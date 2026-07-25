
import {need} from "@e280/stz"
import {prefixes} from "./prefixes.js"
import {suffixes} from "./suffixes.js"

export function *wordsFromBytes(buffer: Iterable<number>) {
	for (const [a, b] of pairwise(buffer))
		yield wordFromPair(a, b)
}

export function *wordsToBytes(motes: Iterable<string>) {
	for (const mote of motes) {
		const [a, b] = wordToPair(mote)
		yield a
		yield b
	}
}

export function wordFromPair(a: number, b: number) {
	return need(prefixes, a) + need(suffixes, b)
}

export function wordToPair(mote: string) {
	const prefix = mote.slice(0, 3)
	const suffix = mote.slice(3, 6)
	return [
		need(prefixes.index, prefix),
		need(suffixes.index, suffix),
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

