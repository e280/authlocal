
import {Science, test, expect} from "@e280/science"
import {Login} from "./crypto/login.js"
import {Claims} from "./crypto/claims.js"
import {generatePassport, generateSession} from "./crypto/routines.js"

import {passportsSuite} from "./crypto/passports.test.js"

const expiresAt = Date.now() + 999_000

async function setupLogin() {
	const passport = await generatePassport()
	const session = await generateSession(passport, {expiresAt})
	const login = await Login.verify(session)
	expect(login.passport.id).is(passport.id)
	expect(login.session.secret).is(session.secret)
	return login
}

await Science.run({
	"login": test(async() => {
		await setupLogin()
	}),

	"claims": Science.suite({
		"sign/verify": test(async() => {
			const login = await setupLogin()
			const claimToken = await Claims.sign<string>(
				login.session,
				"hello",
				{expiresAt},
			)
			const {claim, proof} = await Claims.verify<string>(claimToken)
			expect(proof.passport.id).is(login.passport.id)
			expect(claim).is("hello")
		}),
	}),

	passports: passportsSuite,
})

