
import {Session} from "./session.js"
import {Proof, verifyProof} from "./proof.js"
import {Token, TokenVerifications} from "./token.js"

export class Login {
	static async verify(session: Session, verifications?: TokenVerifications) {
		return new this(session, await verifyProof(session.proofToken, verifications))
	}

	constructor(
		public session: Session,
		public proof: Proof,
	) {}

	get sessionId() { return this.proof.sessionId }
	get proofToken() { return this.session.proofToken }

	get nametag() { return this.proof.nametag }
	get id() { return this.proof.nametag.id }
	get label() { return this.proof.nametag.label }

	isExpired(time = Date.now()) {
		return Token.isExpired(this.proofToken, time)
	}
}

