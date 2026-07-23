import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"

const fakeSeed = `
fakely fakers
dedyak befbef gidvyx mamryd
burdyb pidmyn lentak kemlex
demkex purzen sallak lidmac
nidwyn yabmer vemfek wursyr
`.trim()

export const RecoverySeed = shadow((options: {
		seedText: string
	}) => {

	useName("recovery-seed")
	useCss(theme(), styleCss)

	const $concealed = useSignal(true)
	const displayText = $concealed() ? fakeSeed : options.seedText

	const onClick = (e: Event) => (e.currentTarget as HTMLTextAreaElement).select()
	const toggleConceal = () => $concealed(!$concealed())

	return html`
		<div class=concealer>
			<div class=codebox ?data-concealed="${$concealed()}">
				<header>
					<button x-vibe=naked @click="${toggleConceal}">
						${$concealed() ? "reveal" : "conceal"}
					</button>
					${ShinyCopy(options.seedText)}
				</header>
				<textarea readonly .value="${displayText}" @click="${onClick}"></textarea>
				<div class=blanket></div>
			</div>
		</div>
	`
})

