
import {hex} from "@e280/stz"
import {deriveId} from "./derive.js"
import {Keypair} from "./types.js"

export async function generateKeypair(): Promise<Keypair> {
	const secret = hex.random(32)
	const id = await deriveId(secret)
	return {id, secret}
}

