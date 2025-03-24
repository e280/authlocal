
import "@benev/slate/x/node.js"
import {Suite, expect} from "cynic"
import {Login} from "./auth/login.js"
import {Claims} from "./auth/claims.js"
import {generatePassport, generateSession} from "./auth/routines.js"

async function setup() {
	const passport = await generatePassport()
	const session = await generateSession(passport, {expiresAt: Date.now() + 60_000})
	const login = await Login.verify(session)
	expect(login.id).equals(passport.id)
	expect(login.session.secret).equals(session.secret)
	return login
}

export default <Suite>{
	async "generate a passport, sign a login token, and verify it"() {
		await setup()
	},

	async "sign and verify a claim token"() {
		const login = await setup()
		const claimToken = await Claims.sign<string>(
			login.session,
			"hello",
			{expiresAt: Date.now() + 60_000},
		)
		const {claim, proof} = await Claims.verify<string>(claimToken)
		expect(proof.passportId).equals(login.id)
		expect(claim).equals("hello")
	},
}

