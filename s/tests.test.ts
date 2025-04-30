
import "@benev/slate/x/node.js"
import {Science, test, expect} from "@e280/science"

import {Login} from "./auth/login.js"
import {Claims} from "./auth/claims.js"
import {generatePassport, generateSession} from "./auth/routines.js"

async function setup() {
	const passport = await generatePassport()
	const session = await generateSession(passport, {expiresAt: Date.now() + 60_000})
	const login = await Login.verify(session)
	expect(login.passport.id).is(passport.id)
	expect(login.session.secret).is(session.secret)
	return login
}

await Science.run({
	"generate a passport, sign a login token, and verify it": test(async() => {
		await setup()
	}),

	"sign and verify a claim token": test(async() => {
		const login = await setup()
		const claimToken = await Claims.sign<string>(
			login.session,
			"hello",
			{expiresAt: Date.now() + 60_000},
		)
		const {claim, proof} = await Claims.verify<string>(claimToken)
		expect(proof.passport.id).is(login.passport.id)
		expect(claim).is("hello")
	}),
})

