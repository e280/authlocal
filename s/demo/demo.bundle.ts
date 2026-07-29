
import {dom} from "@e280/sly"
import {effect} from "@e280/strata"
import {Auth} from "../lib/protocol/auth.js"
import {addressEmoji} from "../lib/core/ergo/address/emoji.js"
import {addressMoniker} from "../lib/core/ergo/address/moniker.js"

const auth = new Auth({delegatorUrl: "../"})

await auth.remember()

dom(".login").onclick = () => auth.loginViaPopup()
dom(".logout").onclick = () => auth.logout()

effect(() => {
	const {user} = auth
	dom(".session").textContent = user
		? `${addressEmoji(user.id)} ${addressMoniker(user.id)}`
		: `--`
})

