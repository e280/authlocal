
import {html} from "lit"
import {got} from "@e280/stz"
import {dom, lightElement} from "@e280/sly"

import {Bank} from "./parts/bank.js"
import {Context} from "./context.js"
import {makeHashRouter} from "./routing/hash-router.js"
import {connectToPetitioner} from "../lib/protocol/parts/connect-to-petitioner.js"
import {signDelegate} from "../lib/core/alco/sign-delegate.js"

const authorityOrigin = window.location.origin
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

if (window.opener) {
	const app = await connectToPetitioner(window.opener, appOrigin => ({
		async requestDelegates(petitions) {
			context.$expedition({appOrigin, petitions})
		},
	}))

	context.chooseIdentity.subscribe(async identity => {
		const {appOrigin, petitions} = got(context.$expedition())
		const delegates = petitions.map(petition =>
			signDelegate(identity.root, identity.alias, petition, {appOrigin, authorityOrigin})
		)
		await app.deliverDelegates(delegates)
	})
}

