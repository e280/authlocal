
import {signProof} from "./proof.js"
import {GenerateSessionOptions, Proof, Session} from "./types.js"
import {deriveStableSecret, generateKeypair} from "../crypto/crypto.js"

export async function generateSession({
		expiresAt,
		identity,
		appOrigin,
		authorityOrigin,
		context,
	}: GenerateSessionOptions): Promise<Session> {

	const sessionKeypair = await generateKeypair()

	const proof: Proof = {
		sessionId: sessionKeypair.id,
		nametag: {id: identity.id, label: identity.label},
	}

	return {
		secret: sessionKeypair.secret,
		stableSecret: await deriveStableSecret(identity.secret, `${appOrigin}:${context}`),
		proofToken: await signProof({
			expiresAt,
			proof,
			appOrigin,
			authorityOrigin,
			identitySecret: identity.secret,
		}),
	}
}

