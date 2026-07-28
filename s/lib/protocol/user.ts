
import {Session} from "./types.js"
import {decodeProof} from "../core/alco/decode-proof.js"
import {signTestimony} from "../core/alco/sign-testimony.js"
import {decrypt, encrypt, tokenTime} from "../core/index.js"

export class User {
	#proof

	constructor(public readonly session: Session) {
		this.#proof = decodeProof(session.auth.proofToken)
	}

	/** user's public id, in hex (eg, "cd967edd1a3a82e142faa5003eda67d167a2b5f76d0e97e8158defe59e2a2c89") */
	get id() {
		return this.#proof.id
	}

	/** user's public nickname (eg, "Gandalf the Gray") */
	get alias() {
		return this.session.auth.alias
	}

	/** permanent private key for end-to-end encryption purposes (eg, "34631de533fd0b5dc627fda139d6190556b330a74b521d0d7c590990abd53aee") */
	get cryptSecret() {
		return this.session.crypt.secret
	}

	/** time when this session expires in js milliseconds */
	get expiresAt() {
		return tokenTime.readExpiresAt(this.session.auth.proofToken)
	}

	/** encrypt data with the encyption delegate */
	encrypt(buffer: Uint8Array, aad?: Uint8Array) {
		return encrypt(this.session.crypt.secret, buffer, aad)
	}

	/** decrypt data with the encyption delegate */
	decrypt(ciphertext: Uint8Array, aad?: Uint8Array) {
		return decrypt(this.session.crypt.secret, ciphertext, aad)
	}

	/** sign a testimony token on behalf of the user */
	signTestimony<X>(options: {data: X, audience: string, issuer?: string, atTime?: number, expiresAt?: number}) {
		return signTestimony({
			data: options.data,
			secret: this.session.auth.secret,
			proofToken: this.session.auth.proofToken,
			audience: options.audience,
			issuer: options.issuer ?? window.location.origin,
			expiresAt: options.expiresAt,
			atTime: options.atTime ?? Date.now(),
		})
	}
}

