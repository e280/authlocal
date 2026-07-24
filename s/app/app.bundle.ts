
import {dom} from "@e280/sly"
import {time} from "@e280/stz"
import {openPopup} from "../api/utils/open-popup.js"
import {connectToAuthority} from "../api/connect-to-authority.js"

console.log("authlocal demo app")

dom("button").onclick = async() => {
	const popup = openPopup("auth", "../")

	const authority = await connectToAuthority(popup, {
		async deliverDelegates(delegates) {
			console.log("delegates", delegates)
		},
	})

	await authority.requestDelegates([
		{scope: "login", expiresAt: time.future.days(30)},
	])
}

