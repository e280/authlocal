
import {Barname, Hex} from "@e280/stz"
import {Proofs} from "./proofs.js"
import {TokenParams} from "./token.js"
import {generateKeypair} from "./core.js"
import {Passport, Proof, Session} from "./concepts.js"

export function labelize(id: string) {
	const idBytes = Hex.bytes(id)
	return Barname.string(idBytes.slice(0, 4))
}

export async function generatePassport(): Promise<Passport> {
	const {id, secret} = await generateKeypair()
	const label = labelize(id)
	return {label, id, secret}
}

export async function generateSession(passport: Passport, proofTokenParams: TokenParams): Promise<Session> {
	const sessionKeypair = await generateKeypair()
	const proof: Proof = {
		scope: "proof",
		sessionId: sessionKeypair.id,
		passport: {id: passport.id, label: passport.label},
	}
	return {
		secret: sessionKeypair.secret,
		proofToken: await Proofs.sign(passport.secret, proof, proofTokenParams)
	}
}

