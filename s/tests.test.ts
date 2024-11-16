
import "@benev/slate/x/node.js"
import {Suite, expect} from "cynic"
import {LoginProof} from "./server.js"
import {Passport} from "./auth/passport.js"
import {LoginClaim} from "./auth/tokens/login-claim.js"
import {LoginKeys} from "./auth/tokens/login-keys.js"

async function makeAndValidateLoginToken() {
	const passport = await Passport.generate()
	const {loginProofToken, loginKeysToken} = await passport.signLoginTokens({
		issuer: "testissuer",
		audience: "testaudience",
		expiresAt: Date.now() + 60_000,
	})
	const proof = await LoginProof.verify(loginProofToken, {allowedAudiences: ["testaudience"]})
	const loginKeys = await LoginKeys.verify(proof, loginKeysToken)
	expect(loginKeys.thumbprint).equals(passport.thumbprint)
	return loginKeys
}

export default <Suite>{
	async "generate a passport, sign a login token, and verify it"() {
		await makeAndValidateLoginToken()
	},

	async "sign and verify a claim token"() {
		const loginKeys = await makeAndValidateLoginToken()
		const claimToken = await loginKeys.signClaimToken({
			data: "hello",
			expiresAt: Date.now() + 60_000,
		})
		const proof = await LoginProof.verify(loginKeys.proof.token, {allowedAudiences: ["testaudience"]})
		const claim = await LoginClaim.verify<string>(proof, claimToken)
		expect(claim!.data).equals("hello")
	},
}

