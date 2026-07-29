
import {html} from "lit"
import {dom, lightElement} from "@e280/sly"

import {Bank} from "./parts/bank.js"
import {Context} from "./context.js"
import {delegatorApi} from "./parts/delegator-api.js"
import {makeHashRouter} from "./routing/hash-router.js"
import {connectToApp} from "../lib/protocol/parts/connect-to-app.js"

const delegatorOrigin = window.location.origin
const bank = await Bank.init()
const context = new Context(bank)
const router = makeHashRouter(context)

router.startAtHome()

dom.register({
	AppMain: lightElement(() => router.$page() ?? html`
		<h2>404 not found.</h2>
		<button x-vibe="naked lame" @click="${router.go.home}">home</button>
	`),
})

if (window.opener)
	await connectToApp(window.opener, delegatorApi(context, delegatorOrigin))

