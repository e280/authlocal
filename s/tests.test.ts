
// import "@benev/slate/x/node.js"
// import {Suite, expect} from "cynic"
//
// import {Keys} from "./auth/tokens/keys.js"
// import {Passport} from "./auth/passport.js"
// import {Claim} from "./auth/tokens/claim.js"
// import {Proof} from "./auth/tokens/proof.js"
//
// async function makeAndValidateLoginToken() {
// 	const passport = await Passport.generate()
// 	const {proofToken, keysToken} = await passport.signLoginTokens({
// 		issuer: "testissuer",
// 		audience: "testaudience",
// 		expiresAt: Date.now() + 60_000,
// 	})
// 	const verification = {allowedAudiences: ["testaudience"]}
// 	const proof = await Proof.verify(proofToken, verification)
// 	const loginKeys = await Keys.verify(proof, keysToken, verification)
// 	expect(loginKeys.thumbprint).equals(passport.thumbprint)
// 	return loginKeys
// }
//
// export default <Suite>{
// 	async "generate a passport, sign a login token, and verify it"() {
// 		await makeAndValidateLoginToken()
// 	},
//
// 	async "sign and verify a claim token"() {
// 		const loginKeys = await makeAndValidateLoginToken()
// 		const claimToken = await loginKeys.signClaimToken({
// 			data: "hello",
// 			expiresAt: Date.now() + 60_000,
// 		})
// 		const proof = await Proof.verify(loginKeys.proof.token, {allowedAudiences: ["testaudience"]})
// 		const claim = await Claim.verify<string>(proof, claimToken)
// 		expect(claim!.data).equals("hello")
// 	},
// }

