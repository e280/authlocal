
import {Science, test, expect} from "@e280/science"
import {Login} from "./crypto/login.js"
import {generatePassport} from "./crypto/passports.js"
import {passportsSuite} from "./crypto/passports.test.js"
import {generateSession, signClaim, verifyClaim} from "./crypto/sessions.js"

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
			const claimToken = await signClaim<string>(
				login.session,
				"hello",
				{expiresAt},
			)
			const {claim, proof} = await verifyClaim<string>(claimToken)
			expect(proof.passport.id).is(login.passport.id)
			expect(claim).is("hello")
		}),
	}),

	passports: passportsSuite,
})

