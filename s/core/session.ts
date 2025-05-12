
import {Identity} from "./identity.js"
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
	expiresAt: number
	identity: Identity
	appOrigin: string
	providerOrigin: string
}

export async function generateSession({
		expiresAt,
		identity,
		appOrigin,
		providerOrigin,
	}: GenerateSessionOptions): Promise<Session> {
	const sessionKeypair = await generateKeypair()
	const proof: Proof = {
		sessionId: sessionKeypair.id,
		nametag: {id: identity.id, label: identity.label},
	}
	return {
		secret: sessionKeypair.secret,
		proofToken: await signProof({
			expiresAt,
			proof,
			appOrigin,
			providerOrigin,
			identitySecret: identity.secret,
		}),
	}
}

