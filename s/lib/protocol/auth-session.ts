
import {StandardDelegates} from "./types.js"
import {address, tokenTime} from "../core/index.js"

export class AuthSession {
	constructor(public delegates: StandardDelegates) {}

	get id() {
		return this.delegates.login.signedBy
	}

	get alias() {
		return this.delegates.login.alias
	}

	get address() {
		return address.from(this.id)
	}

	get moniker() {
		return address.moniker(this.id)
	}

	get emoji() {
		return address.emoji(this.id)
	}

	get color() {
		return address.color(this.id)
	}

	get permaSecret() {
		return this.delegates.encryption.secret
	}

	get expiresAt() {
		return tokenTime.readExpiresAt(this.delegates.login.proofToken)
	}
}

