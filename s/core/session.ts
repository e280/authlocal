
import {Identity} from "./identity.js"
import {generateKeypair} from "./crypto.js"
import {Token, TokenParams, TokenPayload} from "./token.js"
import {Proof, ProofPayload, signProof, verifyProof} from "./proof.js"

/** a login session */
export type Session = {

	/** private key for a login session */
	secret: string

	/** proof for this session */
	proofToken: string
}

/** token payload for a generic claim signed by a session */
export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & TokenPayload

export type GenerateSessionOptions = {
	identity: Identity,
	appOrigin: string,
	providerOrigin: string,
} & Omit<TokenParams, "audience" | "issuer">

export async function generateSession({
		identity,
		appOrigin,
		providerOrigin,
		...params
	}: GenerateSessionOptions): Promise<Session> {
	const sessionKeypair = await generateKeypair()
	const proof: Proof = {
		sessionId: sessionKeypair.id,
		nametag: {id: identity.id, label: identity.label},
	}
	return {
		secret: sessionKeypair.secret,
		proofToken: await signProof({
			...params,
			proof,
			appOrigin,
			providerOrigin,
			identitySecret: identity.secret,
		}),
	}
}

export type SignClaimOptions<C> = {
	claim: C
	session: Session
	appOrigin: string
} & Omit<TokenParams, "issuer">

export async function signClaim<C>({claim, session, appOrigin, ...params}: SignClaimOptions<C>) {
	const proof = Token.decode<ProofPayload>(session.proofToken).payload.data
	return Token.sign<ClaimPayload<C>>(session.secret, {
		...Token.params({
			...params,

			// issuer must be the app origin
			issuer: appOrigin,
		}),
		sub: proof.nametag.id,
		data: {
			claim,
			proofToken: session.proofToken,
		},
	})
}

export type VerifyClaimOptions = {
	claimToken: string
	appOrigins: string[]
}

export async function verifyClaim<C>({claimToken, appOrigins}: VerifyClaimOptions) {
	const claimPayload = Token.decode<ClaimPayload<C>>(claimToken).payload
	const {proofToken} = claimPayload.data
	const proofPayload = Token.decode<ProofPayload>(proofToken).payload

	if (!claimPayload.iss)
		throw new Error(`claim token is lacking "iss" field`)

	if (!proofPayload.aud)
		throw new Error(`proof token is lacking "aud" field`)

	if (claimPayload.iss !== proofPayload.aud)
		throw new Error(`claim token iss "${claimPayload.iss}" does not match proof token aud "${proofPayload.aud}"`)

	const proof = await verifyProof({proofToken, appOrigins})

	const {data: {claim}} = await Token.verify<ClaimPayload<C>>(
		proof.sessionId,
		claimToken,

		// claim must have been issued on your app
		{allowedIssuers: appOrigins},
	)

	return {claim, proof, proofToken}
}

