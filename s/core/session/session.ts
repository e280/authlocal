
import {signProof} from "./proof.js"
import {deriveSymkey, generateKeypair} from "../crypto/crypto.js"
import {GenerateSessionOptions, Proof, Session} from "./types.js"

export async function generateSession({
		expiresAt,
		identity,
		appOrigin,
		authorityOrigin,
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
			authorityOrigin,
			identitySecret: identity.secret,
		}),
		symkey: await deriveSymkey(identity.secret, appOrigin),
	}
}

