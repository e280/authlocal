
import {tokentime} from "../token/tokentime.js"
import {signClaim} from "../claim/sign.js"
import {verifyClaim} from "../claim/verify.js"
import {getAppOriginFromProofToken, verifyProof} from "./proof.js"
import {LoginSignClaimOptions, Proof, Session, VerifyLoginOptions} from "./types.js"

export class Login {
	static async verify({session, appOrigins}: VerifyLoginOptions) {
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

	get nametag() { return this.proof.nametag }
	get sessionId() { return this.proof.sessionId }
	get proofToken() { return this.session.proofToken }

	get expiresAt() {
		const expiresAt = tokentime.readExpiresAt(this.proofToken)
		if (expiresAt === undefined)
			throw new Error("misconfigured proof token will never expire")
		return expiresAt
	}

	isExpired(time = Date.now()) {
		return tokentime.isExpired(this.proofToken, time)
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

