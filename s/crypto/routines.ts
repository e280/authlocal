
import {Barname, Hex} from "@e280/stz"
import {Seeds} from "./seeds.js"
import {Proofs} from "./proofs.js"
import {TokenParams} from "./token.js"
import {deriveId, generateKeypair} from "./core.js"
import {Keypair, Passport, Proof, Session} from "./concepts.js"

export const passportVersion = 1

export function labelize(id: string) {
	const idBytes = Hex.bytes(id)
	return Barname.string(idBytes.slice(0, 4))
}

function stampFreshPassport(keypair: Keypair): Passport {
	const label = labelize(keypair.id)
	const issued = Date.now()
	const version = passportVersion
	return {...keypair, label, issued, version}
}

export async function generatePassport(): Promise<Passport> {
	const keypair = await generateKeypair()
	return stampFreshPassport(keypair)
}

export async function recoverPassport(seed: string): Promise<Passport> {
	const secret = await Seeds.toSecret(seed)
	const id = await deriveId(secret)
	return stampFreshPassport({id, secret})
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

