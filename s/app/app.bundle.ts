
import {dom} from "@e280/sly"
import {time} from "@e280/stz"
import {address} from "../lib/index.js"
import {Delegate} from "../lib/alco/types.js"
import {openPopup} from "../api/utils/open-popup.js"
import {verifyDelegate} from "../lib/alco/verify-delegate.js"
import {connectToAuthority} from "../api/connect-to-authority.js"
import {generateSecret} from "../lib/cryp/generate-secret.js"

console.log("authlocal demo app")

dom("button").onclick = async() => {
	const popup = openPopup("auth", "../")

	const authority = await connectToAuthority(popup, {
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

	await authority.requestDelegates([
		{scope: "login:" + generateSecret(), expiresAt: time.future.days(30)},
		{scope: "encryption", expiresAt: time.future.days(30)},
	])
}

