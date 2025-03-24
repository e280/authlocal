
import {Token} from "./jwt/token.js"
import {TokenParams, TokenPayload, TokenVerifyOptions} from "./jwt/types.js"

export type Passport = {
	id: string
	secret: string
	label: string | null
}

export type Session = {
	secret: string
	proofToken: string
}

export type Proof = {
	sessionId: string
	passportId: string
}

export type ProofPayload = {data: Proof} & TokenPayload

export async function signProof(passport: Passport, proof: Proof, options: TokenParams) {
	return Token.sign<ProofPayload>(passport.secret, {
		...Token.params(options),
		sub: proof.passportId,
		data: proof,
	})
}

export async function verifyProof(proofToken: string, options?: TokenVerifyOptions) {
	const pre = Token.decode<ProofPayload>(proofToken)
	const {data: proof} = await Token.verify<ProofPayload>(
		pre.payload.data.passportId,
		proofToken,
		options,
	)
	return proof
}

export class Login {
	claim: ClaimSigner

	constructor(
			public session: Session,
			public proof: Proof,
		) {
		this.claim = new ClaimSigner(session, proof)
	}

	get secret() { return this.session.secret }
	get proofToken() { return this.session.proofToken }
	get id() { return this.proof.sessionId }
	get passportId() { return this.proof.passportId }

	static async verify(session: Session) {
		return new this(session, await verifyProof(session.proofToken))
	}
}

export type ClaimPayload<C> = {sub: string, data: {claim: C, proofToken: string}} & TokenPayload

export class ClaimVerifier {
	async verify<C>(claimToken: string, options?: {
			proof: TokenVerifyOptions
			claim: TokenVerifyOptions
		}) {
		const pre = Token.decode<ClaimPayload<C>>(claimToken)
		const proof = await verifyProof(pre.payload.data.proofToken, options?.proof)
		const payload = await Token.verify<ClaimPayload<C>>(proof.sessionId, claimToken, options?.claim)
		return payload.data
	}
}

export class ClaimSigner extends ClaimVerifier {
	constructor(public session: Session, public proof: Proof) {
		super()
	}

	async sign<C>(claim: C, params: TokenParams) {
		return Token.sign<ClaimPayload<C>>(this.session.secret, {
			...Token.params(params),
			sub: this.proof.passportId,
			data: {
				claim,
				proofToken: this.session.proofToken,
			},
		})
	}
}

