
import {Proofs} from "./proofs.js"
import {Proof, Session} from "./concepts.js"
import {TokenVerifications} from "./token.js"

export class Login {
	static async verify(session: Session, verifications?: TokenVerifications) {
		return new this(session, await Proofs.verify(session.proofToken, verifications))
	}

	constructor(
		public session: Session,
		public proof: Proof,
	) {}

	get secret() { return this.session.secret }
	get proofToken() { return this.session.proofToken }
	get passport() { return this.proof.passport }
	get sessionId() { return this.proof.sessionId }
}

