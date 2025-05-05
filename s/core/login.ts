
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

	get proofToken() { return this.session.proofToken }
	get passport() { return this.proof.passport }
	get sessionId() { return this.proof.sessionId }

	isExpired(time = Date.now()) {
		return Token.isExpired(this.proofToken, time)
	}
}

