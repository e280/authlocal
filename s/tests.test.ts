
import "@benev/slate/x/node.js"
import {Suite, expect} from "cynic"
import {Proof} from "./server.js"
import {Passport} from "./auth/passport.js"
import {Login} from "./auth/tokens/login.js"
import {Claim} from "./auth/tokens/claim.js"

async function makeAndValidateLoginToken() {
	const passport = await Passport.generate()
	const {proofToken, loginToken} = await passport.signLoginToken({
		issuer: "testissuer",
		audience: "testaudience",
		expiry: Date.now() + 60_000,
	})
	const proof = await Proof.verify(proofToken)
	const login = await Login.verify(proof, loginToken)
	expect(login.thumbprint).equals(passport.thumbprint)
	return login
}

export default <Suite>{
	async "generate a passport, sign a login token, and verify it"() {
		await makeAndValidateLoginToken()
	},

	async "sign and verify a claim token"() {
		const login = await makeAndValidateLoginToken()
		const claimToken = await login.signClaimToken({
			data: "hello",
			expiry: Date.now() + 60_000,
		})
		const proof = await Proof.verify(login.proof.token)
		const claim = await Claim.verify<string>(proof, claimToken)
		expect(claim!.data).equals("hello")
	},
}

