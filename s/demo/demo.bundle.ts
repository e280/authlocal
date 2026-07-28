
import {dom} from "@e280/sly"
import {effect} from "@e280/strata"
import {Auth} from "../lib/protocol/auth.js"
import {address} from "../lib/core/index.js"

const auth = new Auth({delegatorUrl: "../"})

await auth.remember()

dom(".login").onclick = () => auth.loginViaPopup()
dom(".logout").onclick = () => auth.logout()

effect(() => {
	const {user} = auth
	dom(".session").textContent = user
		? `${address.emoji(user.id)} ${address.moniker(user.id)}`
		: `--`
})

