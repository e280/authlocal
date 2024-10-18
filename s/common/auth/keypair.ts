
import {deep} from "@benev/slate"
import {hex} from "../../tools/hex.js"
import {KeypairJson} from "./types.js"

export class Keypair {
	static thumbalgo = "SHA-256" as const
	static algo = {name: "ECDSA", namedCurve: "P-256"}
	static format = {public: "spki" as const, private: "pkcs8" as const}

	constructor(
		public readonly keys: CryptoKeyPair,
		public readonly thumbprint: string,
		private readonly json: KeypairJson,
	) {}

	static async generate() {
		const keys = await crypto.subtle
			.generateKey(this.algo, true, ["sign", "verify"])

		const publicBuffer = await crypto.subtle
			.exportKey(Keypair.format.public, keys.publicKey)

		const privateBuffer = await crypto.subtle
			.exportKey(Keypair.format.private, keys.privateKey)

		const thumbprint = hex.from.buffer(
			await crypto.subtle.digest(Keypair.thumbalgo, publicBuffer)
		)

		const hexkeys: KeypairJson = {
			public: hex.from.buffer(publicBuffer),
			private: hex.from.buffer(privateBuffer),
		}

		return new this(keys, thumbprint, hexkeys)
	}

	static async fromJson(json: KeypairJson) {
		const extractable = true
		const publicBuffer = hex.to.buffer(json.public)
		const privateBuffer = hex.to.buffer(json.private)

		const thumbprint = hex.from.buffer(
			await crypto.subtle.digest(Keypair.thumbalgo, publicBuffer)
		)

		const publicKey = await crypto.subtle.importKey(
			this.format.public,
			publicBuffer,
			this.algo,
			extractable,
			["verify"],
		)

		const privateKey = await crypto.subtle.importKey(
			this.format.private,
			privateBuffer,
			this.algo,
			extractable,
			["sign"],
		)

		return new Keypair({publicKey, privateKey}, thumbprint, json)
	}

	toJson() {
		return deep.clone(this.json)
	}
}

