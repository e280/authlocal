
import {hex} from "@e280/stz"

import {Keypair} from "./types.js"
import {deriveId} from "./derive.js"

export async function generateKeypair(): Promise<Keypair> {
	const seed = hex.random(32)
	const id = await deriveId(seed)
	return {id, seed}
}

