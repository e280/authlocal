
import {Identity} from "./identity.js"
import {TokenParams} from "./token.js"
import {generateKeypair} from "./crypto.js"
import {Proof, signProof} from "./proof.js"

/** a login session */
export type Session = {

	/** private key for a login session */
	secret: string

	/** proof for this session */
	proofToken: string
}

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

