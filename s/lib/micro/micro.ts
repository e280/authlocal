
import {base58, txt} from "@e280/stz"
import {Id, Secret} from "../cryp/types.js"
import {signBytes} from "../cryp/sign-bytes.js"
import {verifyBytes} from "../cryp/verify-bytes.js"

export type MicroData = {
	payload: Uint8Array
	expiresAt: number
	audience: string
}

const version = 0x01

export function microSign(secret: Secret, data: MicroData) {
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

export function microDecode(token: string) {
	const [message58, signature58] = token.split("_")
	const message = base58.toBytes(message58)
	const signature = base58.toBytes(signature58)
	const version = message.slice(0, 1).at(0)!
	const [bExpiry, bAudience, payload] = unpack(message.slice(1))
	const expiresAt = 1000 * Number(view(bExpiry).getBigInt64(0, true))
	const audience = txt.fromBytes(bAudience)
	return {message, signature, version, payload, expiresAt, audience}
}

const view = (b: Uint8Array) => new DataView(b.buffer, b.byteOffset, b.byteLength)

export function microVerify(id: Id, token: string, options: {
		atTime?: number
		allowedAudiences?: string[]
	} = {}) {

	const decoded = microDecode(token)

	if (!verifyBytes(id, decoded.message, decoded.signature))
		throw new Error("micro token failed verification")

	if (options.allowedAudiences && !options.allowedAudiences.includes(decoded.audience))
		throw new Error("micro token audience not allowed")

	if ((options.atTime ?? Date.now()) >= decoded.expiresAt)
		throw new Error("micro token expired")

	return decoded
}

function pack(...parts: Uint8Array[]) {
	return new Uint8Array(
		parts.flatMap(part => [...u16(part.length), ...part])
	)
}

function* unpack(buffer: Uint8Array) {
	const v = view(buffer)
	let o = 0

	while (o < buffer.length) {
		const length = v.getUint16(o, true)
		o += 2
		yield buffer.slice(o, o + length)
		o += length
	}
}

function u16(n: number) {
	const b = new Uint8Array(2)
	view(b).setUint16(0, n, true)
	return b
}

function i64(n: number) {
	const b = new Uint8Array(8)
	view(b).setBigInt64(0, BigInt(n), true)
	return b
}

