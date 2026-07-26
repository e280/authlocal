
import {html} from "lit"
import {defer} from "@e280/stz"
import {dom, lightElement} from "@e280/sly"

import {Identity} from "./types.js"
import {Bank} from "./parts/bank.js"
import {Context} from "./context.js"
import {makeHashRouter} from "./routing/hash-router.js"
import {signDelegate} from "../lib/core/alco/sign-delegate.js"
import {connectToPetitioner} from "../lib/protocol/parts/connect-to-petitioner.js"

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

if (window.opener) {
	await connectToPetitioner(window.opener, petitionerOrigin => ({
		async requestDelegates(petitions) {
			const chooseIdentity = defer<Identity>()

			context.$expedition({
				petitionerOrigin,
				petitions,
				chooseIdentity: chooseIdentity.resolve,
			})

			const identity = await chooseIdentity.promise

			return petitions.map(petition =>
				signDelegate({
					root: identity.root,
					alias: identity.alias,
					petition,
					delegatorOrigin,
					petitionerOrigin,
					atTime: Date.now(),
				})
			)
		},
	}))
}

