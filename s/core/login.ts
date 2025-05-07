
import {Token} from "./token.js"
import {getAppOriginFromProofToken, Proof, verifyProof} from "./proof.js"
import {Session, signClaim, SignClaimOptions, verifyClaim} from "./session.js"

export type LoginVerifyOptions = {session: Session, appOrigins: string[]}
export type LoginSignClaimOptions<C> = Omit<SignClaimOptions<C>, "session" | "appOrigin">

export class Login {
	static async verify({session, appOrigins}: LoginVerifyOptions) {
		const {proofToken} = session
		const proof = await verifyProof({proofToken, appOrigins})
		const proofAppOrigin = getAppOriginFromProofToken(proofToken)
		return new this(session, proof, proofAppOrigin)
	}

	constructor(
		public readonly session: Session,
		public readonly proof: Proof,
		public readonly proofAppOrigin: string,
	) {}

	get sessionId() { return this.proof.sessionId }
	get proofToken() { return this.session.proofToken }

	get nametag() { return this.proof.nametag }
	get id() { return this.proof.nametag.id }
	get label() { return this.proof.nametag.label }

	get expiresAt() {
		const expiresAt = Token.expiresAt(this.proofToken)
		if (expiresAt === undefined)
			throw new Error("misconfigured proof token will never expire")
		return expiresAt
	}

	isExpired(time = Date.now()) {
		return Token.isExpired(this.proofToken, time)
	}

	async signClaim<C>(options: LoginSignClaimOptions<C>) {
		const claimToken = await signClaim({
			...options,
			session: this.session,
			appOrigin: this.proofAppOrigin,
		})

		// self-verify, helping to catch errors earlier
		await verifyClaim({claimToken, appOrigins: [this.proofAppOrigin]})

		return claimToken
	}
}

