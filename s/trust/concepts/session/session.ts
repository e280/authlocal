
import {signProof} from "./proof.js"
import {generateKeypair} from "../crypto/crypto.js"
import {GenerateSessionOptions, Proof, Session} from "./types.js"

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

