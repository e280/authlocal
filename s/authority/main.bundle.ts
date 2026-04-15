
import {html} from "lit"
import {dom, light} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {makeHashRouter} from "./routing/hash-router.js"

const bank = await Bank.init()
const router = makeHashRouter(bank)

router.startAtHome()

const App = light(() => router.$content() ?? html`
	<h2>404 not found.</h2>
	<button data-vibe="naked lame" @click="${router.go.home}">home</button>
`)

dom.render(dom("main"), App())

