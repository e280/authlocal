
import {hex} from "@e280/stz"
import {deriveId} from "./derive.js"
import {Keypair} from "./types.js"

export async function generateKeypair(): Promise<Keypair> {
	const seed = hex.random(32)
	const id = await deriveId(seed)
	return {id, seed}
}

