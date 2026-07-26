
import {StandardDelegates} from "./types.js"
import {address, decrypt, encrypt, tokenTime} from "../core/index.js"
import { signTestimony } from "../core/alco/sign-testimony.js"
import { verifyTestimony } from "../core/alco/verify-testimony.js"

export class Session {
	constructor(public delegates: StandardDelegates) {}

	/** user's public id, in hex (eg, "cd967edd1a3a82e142faa5003eda67d167a2b5f76d0e97e8158defe59e2a2c89") */
	get id() {
		return this.delegates.login.identityId
	}

	/** user's public nickname (eg, "Chase") */
	get alias() {
		return this.delegates.login.alias
	}

	/** user's public id, in human-friendly address format (eg, "volrad_welsyx_EqXgGh7SEyGzpbUiacCJ7BVpAP1kBePt6THiR8gSTtGx") */
	get address() {
		return address.from(this.id)
	}

	/** shorthand part from the address (eg, "volrad_welsyx") */
	get moniker() {
		return address.moniker(this.id)
	}

	/** emoji, derived from user id (eg, "🦎") */
	get emoji() {
		return address.emoji(this.id)
	}

	/** css color, derived from user id (eg, "oklch(0.8 0.076 79.05)") */
	get color() {
		return address.color(this.id)
	}

	/** permanent private key for end-to-end encryption purposes (eg, "34631de533fd0b5dc627fda139d6190556b330a74b521d0d7c590990abd53aee") */
	get encryptionSecret() {
		return this.delegates.encryption.secret
	}

	/** time when this session expires in js milliseconds */
	get expiresAt() {
		return tokenTime.readExpiresAt(this.delegates.login.proofToken)
	}

	/** perform encryption of data for this user */
	encrypt(buffer: Uint8Array, aad?: Uint8Array) {
		return encrypt(this.delegates.encryption.secret, buffer, aad)
	}

	/** perform decryption of data for this user */
	decrypt(ciphertext: Uint8Array, aad?: Uint8Array) {
		return decrypt(this.delegates.encryption.secret, ciphertext, aad)
	}

	sign<X>(data: X, options: {issuer?: string, audience: string, atTime?: number, expiresAt?: number}) {
		return signTestimony({
			data,
			secret: this.delegates.login.secret,
			proofToken: this.delegates.login.proofToken,
			atTime: options.atTime ?? Date.now(),
			audience: options.audience,
			issuer: options.issuer ?? window.location.origin,
			expiresAt: options.expiresAt,
		})
	}
}

