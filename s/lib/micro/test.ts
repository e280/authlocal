
import {txt} from "@e280/stz"
import {expect, suite, test} from "@e280/science"
import {microSign} from "./fns/sign.js"
import {microDecode} from "./fns/decode.js"
import {microVerify} from "./fns/verify.js"
import {deriveId} from "../cryp/derive-id.js"
import {generateSecret} from "../cryp/generate-secret.js"

export const exampleAudience = "https://e280.org"

function exampleSign() {
	const secret = generateSecret()
	const id = deriveId(secret)
	const payload = txt.toBytes("hello123")
	const token = microSign(secret, {
		payload,
		expiresAt: 2000,
		audience: exampleAudience,
	})
	return {secret, id, payload, token}
}

export default suite({
	"sign and decode": test(async() => {
		const {token} = exampleSign()
		const decoded = microDecode(token)
		expect(txt(decoded.payload)).is("hello123")
		expect(decoded.version).is(1)
		expect(decoded.audience).is(exampleAudience)
		expect(decoded.expiresAt).is(2000)
		expect(decoded.signature.length).is(64)
	}),

	"sign and verify": test(async() => {
		const {id, token} = exampleSign()
		const verified = microVerify(id, token, {
			atTime: 1000,
			allowedAudiences: [exampleAudience],
		})
		expect(txt(verified.payload)).is("hello123")
	}),

	"expired": test(async() => {
		const {id, token} = exampleSign()
		expect(() => microVerify(id, token, {
			atTime: 3000,
			allowedAudiences: [exampleAudience],
		})).throws()
	}),

	"wrong audience": test(async() => {
		const {id, token} = exampleSign()
		expect(() => microVerify(id, token, {
			atTime: 3000,
			allowedAudiences: ["https://bad.e280.org"],
		})).throws()
	}),

	"bad id": test(async() => {
		const {token} = exampleSign()
		const badId = deriveId(generateSecret())
		expect(() => microVerify(badId, token, {
			atTime: 3000,
			allowedAudiences: ["https://bad.e280.org"],
		})).throws()
	}),
})

