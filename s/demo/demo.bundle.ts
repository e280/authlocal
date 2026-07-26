
import {dom} from "@e280/sly"
import {effect} from "@e280/strata"
import {Auth} from "../lib/protocol/auth.js"

const auth = new Auth({delegatorUrl: "../"})

await auth.remember()

dom(".login").onclick = () => auth.loginViaPopup()
dom(".logout").onclick = () => auth.logout()

effect(() => {
	const {user: session} = auth
	console.log(session)
	dom(".session").textContent = session
		? `${session.emoji} ${session.moniker}`
		: `--`
})

