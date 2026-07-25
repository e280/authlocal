
import {dom} from "@e280/sly"
import {time} from "@e280/stz"
import {address} from "../lib/core/index.js"
import {Delegate} from "../lib/core/alco/types.js"
import {openPopup} from "../lib/protocol/utils/open-popup.js"
import {generateSecret} from "../lib/core/cryp/generate-secret.js"
import {verifyDelegate} from "../lib/core/alco/verify-delegate.js"
import {connectToDelegator} from "../lib/protocol/parts/connect-to-delegator.js"

dom("button").onclick = async() => {
	const popup = openPopup("auth", "../")

	const delegator = await connectToDelegator(popup, {
		async deliverDelegates(delegates) {
			const [loginDelegate, encryptionDelegate] = await Promise.all(
				delegates.map((delegate: Delegate) =>
					verifyDelegate(delegate, {
						allowedDelegators: [window.location.origin],
						allowedPetitioners: [window.location.origin],
					})
				)
			)
			console.log("logged in as", address.from(loginDelegate.signedBy))
			console.log("encryption symkey", encryptionDelegate.secret)
			popup.close()
		},
	})

	await delegator.requestDelegates([
		{scope: "login:" + generateSecret(), expiresAt: time.future.days(30)},
		{scope: "encryption", expiresAt: time.future.days(30)},
	])
}

