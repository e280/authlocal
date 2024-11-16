
import {Bytename, deep, Hex, hexId} from "@benev/slate"

import {Keypair} from "./keypair.js"
import {PassportData, KeypairData} from "./types.js"
import {JsonWebToken} from "./utils/json-web-token.js"
import {LoginKeysPayload, LoginTokens, LoginProofPayload} from "./tokens/types.js"

export class Passport {
	constructor(
		public readonly keypairData: KeypairData,
		public name: string,
		public created: number,
	) {}

	get thumbprint() {
		return this.keypairData.thumbprint
	}

	static async generate() {
		const keypair = await Keypair.generate()
		const keypairData = await keypair.toData()

		const thumbBytes = Hex.bytes(keypair.thumbprint).slice(0, 5)
		const name = Bytename.string(thumbBytes, "Xxxxxx Xxxxxxxxx ")

		const created = Date.now()
		return new this(keypairData, name, created)
	}

	static fromData(data: PassportData) {
		const {keypair, name, created} = data
		return new this(keypair, name, created)
	}

	toData(): PassportData {
		return deep.clone({
			keypair: this.keypairData,
			name: this.name,
			created: this.created,
		})
	}

	async getKeypair() {
		return await Keypair.fromData(this.keypairData)
	}

	async signLoginTokens(o: {
			expiry: number
			issuer: string
			audience: string
		}): Promise<LoginTokens> {

		const passportKeypair = await this.getKeypair()
		const loginKeypair = await Keypair.generate()
		const exp = JsonWebToken.fromJsTime(o.expiry)
		const name = this.name
		const iss = o.issuer
		const aud = o.audience
		const jti = hexId()

		const loginProofToken = await passportKeypair.sign<LoginProofPayload>({
			exp,
			iss,
			aud,
			jti,
			data: {
				name,
				loginPubkey: await loginKeypair.toPubkey().toData(),
				passportPubkey: await passportKeypair.toPubkey().toData(),
			},
		})

		const loginKeysToken = await passportKeypair.sign<LoginKeysPayload>({
			sub: this.thumbprint,
			exp,
			iss,
			jti,
			data: {
				loginKeypair: await loginKeypair.toData(),
			},
		})

		return {loginProofToken, loginKeysToken}
	}
}

