
import {deep, hexId, randomFullName} from "@benev/slate"

import {Keypair} from "./keypair.js"
import {PassportJson, KeypairJson} from "./types.js"
import {JsonWebToken} from "./utils/json-web-token.js"
import {LoginPayload, LoginSessionTokens, ProofPayload} from "./tokens/types.js"

export class Passport {
	constructor(
		public readonly keypairJson: KeypairJson,
		public name: string,
		public created: number,
	) {}

	get thumbprint() {
		return this.keypairJson.thumbprint
	}

	static async generate() {
		const keypair = await Keypair.generate()
		const keypairJson = await keypair.toJson()
		const name = randomFullName()
		const created = Date.now()
		return new this(keypairJson, name, created)
	}

	static fromJson(json: PassportJson) {
		const {keypair, name, created} = json
		return new this(keypair, name, created)
	}

	toJson(): PassportJson {
		return deep.clone({
			keypair: this.keypairJson,
			name: this.name,
			created: this.created,
		})
	}

	async getKeypair() {
		return await Keypair.fromJson(this.keypairJson)
	}

	async signLoginToken(o: {
			expiry: number
			issuer: string
			audience: string
		}): Promise<LoginSessionTokens> {

		const passportKeypair = await this.getKeypair()
		const loginKeypair = await Keypair.generate()
		const exp = JsonWebToken.fromJsTime(o.expiry)
		const name = this.name
		const iss = o.issuer
		const aud = o.audience
		const jti = hexId()

		const proofToken = await passportKeypair.sign<ProofPayload>({
			exp,
			iss,
			aud,
			jti,
			data: {
				loginPubkey: await loginKeypair.toPubkey().toJson(),
				passportPubkey: await passportKeypair.toPubkey().toJson(),
			},
		})

		const loginToken = await passportKeypair.sign<LoginPayload>({
			sub: this.thumbprint,
			exp,
			jti,
			data: {
				name,
				loginKeypair: await loginKeypair.toJson(),
			},
		})

		return {proofToken, loginToken}
	}
}

