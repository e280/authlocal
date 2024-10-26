
import "@benev/slate/x/node.js"
import {Suite, expect} from "cynic"
import {Proof} from "./server.js"
import {Passport} from "./auth/passport.js"
import {Login} from "./auth/tokens/login.js"
import {Challenge} from "./auth/tokens/challenge.js"

async function makeAndValidateLoginToken() {
	const passport = await Passport.generate()
	const loginToken = await passport.signLoginToken({
		issuer: "testissuer",
		audience: "testaudience",
		expiry: Date.now() + 60_000,
	})
	const login = await Login.verify(loginToken)
	expect(login.thumbprint).equals(passport.thumbprint)
	return login
}

export default <Suite>{
	async "generate a passport, sign a login token, and verify it"() {
		await makeAndValidateLoginToken()
	},

	async "sign and verify a challenge token"() {
		const login = await makeAndValidateLoginToken()
		const challengeToken = await login.signChallengeToken({
			data: "hello",
			expiry: Date.now() + 60_000,
		})
		const proof = await Proof.verify(login.proof.token)
		const challenge = await Challenge.verify<string>(proof, challengeToken)
		expect(challenge!.data).equals("hello")
	},
}

