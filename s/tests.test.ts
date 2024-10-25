
import "@benev/slate/x/node.js"
import {Suite, expect} from "cynic"
import {verify} from "./auth/verify.js"
import {Passport} from "./auth/passport.js"

export default <Suite>{
	async "generate a passport, sign a login token, and verify it"() {
		const passport = await Passport.generate()
		const loginToken = await passport.signLoginToken({
			issuer: "testissuer",
			audience: "testaudience",
			expiry: Date.now() + 60_000,
		})
		const login = await verify(loginToken)
		if (!login)
			throw new Error("invalid login token")
		expect(login.thumbprint).equals(passport.thumbprint)
	},
}

