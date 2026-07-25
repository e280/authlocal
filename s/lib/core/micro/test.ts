
import {txt} from "@e280/stz"
import {expect, suite, test} from "@e280/science"
import {microSign} from "./fns/sign.js"
import {microDecode} from "./fns/decode.js"
import {microVerify} from "./fns/verify.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {generateSecret} from "../cryp/generate-secret.js"

export const exampleAudience = "https://e280.org"

function exampleSign(expiresAt = Date.now()) {
	const secret = generateSecret()
	const id = deriveId(secret)
	const payload = txt.toBytes(generateSecret())
	const audience = exampleAudience
	const token = microSign(secret, {payload, expiresAt, audience})
	return {secret, id, payload, token}
}

export default suite({
	"smaller than jwt": test(async() => {
		const now = Date.now()
		const {token, secret, payload} = exampleSign(now)
		const jwt = signToken(secret, {
			sub: txt(payload),
			exp: tokenTime.at(now),
			aud: exampleAudience,
		})
		const fraction = token.length / jwt.length
		expect(fraction).lt(0.8)
	}),

	"sign and decode": test(async() => {
		const {token, payload} = exampleSign(2000)
		const decoded = microDecode(token)
		expect(txt(decoded.payload)).is(txt(payload))
		expect(decoded.version).is(1)
		expect(decoded.audience).is(exampleAudience)
		expect(decoded.expiresAt).is(2000)
		expect(decoded.signature.length).is(64)
	}),

	"sign and verify": test(async() => {
		const {id, token, payload} = exampleSign(2000)
		const verified = microVerify(id, token, {
			atTime: 1000,
			allowedAudiences: [exampleAudience],
		})
		expect(txt(verified.payload)).is(txt(payload))
	}),

	"expired": test(async() => {
		const {id, token} = exampleSign(2000)
		expect(() => microVerify(id, token, {
			atTime: 3000,
			allowedAudiences: [exampleAudience],
		})).throws()
	}),

	"wrong audience": test(async() => {
		const {id, token} = exampleSign(2000)
		expect(() => microVerify(id, token, {
			atTime: 1000,
			allowedAudiences: ["https://bad.e280.org"],
		})).throws()
	}),

	"bad id": test(async() => {
		const {token} = exampleSign(2000)
		const badId = deriveId(generateSecret())
		expect(() => microVerify(badId, token, {
			atTime: 1000,
			allowedAudiences: [exampleAudience],
		})).throws()
	}),
})

