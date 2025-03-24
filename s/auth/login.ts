
import {Proofs} from "./proofs.js"
import {Proof, Session} from "./concepts.js"

export class Login {
	static async verify(session: Session) {
		return new this(session, await Proofs.verify(session.proofToken))
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

