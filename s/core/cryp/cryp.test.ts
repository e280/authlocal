
import {suite, test, expect} from "@e280/science"
import {hash} from "./hashing.js"
import {generateKeypair} from "./gen.js"
import {deriveScopedSecret, deriveSharedSecret} from "./derive.js"

export default suite({
	hashing: suite({
		"hash 'hello'": test(async() => {
			const text = "hello"
			expect(hash(text).length).is(64)
		}),

		"deriveSharedSecret": test(async() => {
			const alice = generateKeypair()
			const bob = generateKeypair()
			const aliceShared = deriveSharedSecret(alice.secret, bob.id)
			const bobShared = deriveSharedSecret(bob.secret, alice.id)
			expect(aliceShared).is(bobShared)
			expect(aliceShared.length).is(64)
		}),

		"deriveSharedSecret+scoped": test(async() => {
			const alice = generateKeypair()
			const bob = generateKeypair()
			const aliceShared = deriveSharedSecret(alice.secret, bob.id)
			const bobShared = deriveSharedSecret(bob.secret, alice.id)
			const aliceScoped = deriveScopedSecret(aliceShared, "scope:alpha")
			const bobScoped = deriveScopedSecret(bobShared, "scope:alpha")
			expect(aliceShared).isnt(aliceScoped)
			expect(aliceScoped).is(bobScoped)
		}),
	}),
})

