
import {Proofs} from "./proofs.js"
import {Proof, Session} from "./types.js"

export class Login {
	constructor(
		public session: Session,
		public proof: Proof,
	) {}

	get secret() { return this.session.secret }
	get proofToken() { return this.session.proofToken }
	get id() { return this.proof.passportId }
	get sessionId() { return this.proof.sessionId }

	static async verify(session: Session) {
		return new this(session, await Proofs.verify(session.proofToken))
	}
}

