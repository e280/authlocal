
import {base58, txt} from "@e280/stz"
import {i64} from "../utils/i64.js"
import {pack} from "../utils/pack.js"
import {Secret} from "../../cryp/types.js"
import {MicroData} from "../types/data.js"
import {signBytes} from "../../cryp/sign-bytes.js"

export function microSign(secret: Secret, data: MicroData) {
	const version = 0x01
	const message = new Uint8Array([
		version,
		...pack(
			i64(Math.floor(data.expiresAt / 1000)),
			txt.toBytes(data.audience),
			data.payload,
		),
	])
	const signature = signBytes(secret, message)
	return `${base58.fromBytes(message)}_${base58.fromBytes(signature)}`
}

