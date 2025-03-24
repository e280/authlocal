
import {Proofs} from "./proofs.js"
import {TokenVerifications} from "./jwt.js"
import {Proof, Session} from "./concepts.js"

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
	get id() { return this.proof.passportId }
	get sessionId() { return this.proof.sessionId }
}

