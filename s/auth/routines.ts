
import {Barname, Hex} from "@benev/slate"
import {Proofs} from "./proofs.js"
import {TokenParams} from "./jwt.js"
import {generateKeypair} from "./crypto.js"
import {Passport, Proof, Session} from "./concepts.js"

export async function generatePassport(): Promise<Passport> {
	const {id, secret} = await generateKeypair()
	const idBytes = Hex.bytes(id)
	const label = Barname.string(idBytes.slice(0, 4))
	return {id, secret, label}
}

export async function generateSession(passport: Passport, proofTokenParams: TokenParams): Promise<Session> {
	const sessionKeypair = await generateKeypair()
	const proof: Proof = {
		scope: "proof",
		passportId: passport.id,
		passportLabel: passport.label,
		sessionId: sessionKeypair.id,
	}
	return {
		secret: sessionKeypair.secret,
		proofToken: await Proofs.sign(passport.secret, proof, proofTokenParams)
	}
}

