
import {html} from "lit"
import {dom, light} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {Banner} from "./views/banner/view.js"
import {makeHashRouter} from "./routing/hash-router.js"

const bank = await Bank.init()
const router = makeHashRouter(bank)

router.startAtHome()

const App = light(() => {
	return html`
		${Banner({
			zone: router.$zone(),
			gotoList: () => router.go.list(),
			gotoCreate: () => router.go.create(),
			gotoRecovery: () => router.go.recovery(),
		})}

		${router.$content() ?? html`
			<h2>404 not found.</h2>
			<button data-vibe="naked lame" @click="${router.go.home}">home</button>
		`}
	`
})

dom.render(dom("main"), App())

