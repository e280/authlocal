
import {html} from "lit"
import {dom, lightElement, shadowElement} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {makeHashRouter} from "./routing/hash-router.js"

const bank = await Bank.init()
const router = makeHashRouter(bank)

router.startAtHome()

dom.register({
	AppSubtitle: shadowElement(() => router.$subtitle()),
	AppMain: lightElement(() => router.$page() ?? html`
		<h2>404 not found.</h2>
		<button data-vibe="naked lame" @click="${router.go.home}">home</button>
	`),
})

