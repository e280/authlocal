
import {suite, test, expect} from "@e280/science"
import {hash} from "./hash.js"
import {generateKeypair} from "./generate-keypair.js"
import {deriveSharedSecret} from "./derive-shared-secret.js"
import {deriveScopedSecret} from "./derive-scoped-secret.js"

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

