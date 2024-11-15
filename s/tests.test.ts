
import "@benev/slate/x/node.js"
import {Suite, expect} from "cynic"
import {LoginProof} from "./server.js"
import {Passport} from "./auth/passport.js"
import {LoginClaim} from "./auth/tokens/login-claim.js"
import {LoginKeypair} from "./auth/tokens/login-keypair.js"

async function makeAndValidateLoginToken() {
	const passport = await Passport.generate()
	const {proofToken, loginToken} = await passport.signLoginToken({
		issuer: "testissuer",
		audience: "testaudience",
		expiry: Date.now() + 60_000,
	})
	const proof = await LoginProof.verify(proofToken)
	const login = await LoginKeypair.verify(proof, loginToken)
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
		const proof = await LoginProof.verify(login.proof.token)
		const claim = await LoginClaim.verify<string>(proof, claimToken)
		expect(claim!.data).equals("hello")
	},
}

