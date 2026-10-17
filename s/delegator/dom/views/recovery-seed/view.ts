import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {shadowView, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../theme.js"

const fakeSeed = `
fakely fakers
dedyak befbef gidvyx mamryd
burdyb pidmyn lentak kemlex
`.trim()

export const RecoverySeed = shadowView((options: {
		phrase: string
	}) => {

	useName("recovery-seed")
	useCss(theme(), styleCss)

	const $concealed = useSignal(true)
	const displayText = $concealed() ? fakeSeed : options.phrase

	const onClick = (e: Event) => (e.currentTarget as HTMLTextAreaElement).select()
	const toggleConceal = () => $concealed(!$concealed())

	return html`
		<div class=concealer>
			<div class=codebox ?data-concealed="${$concealed()}">
				<header>
					<button @click="${toggleConceal}">
						${$concealed() ? "reveal" : "conceal"}
					</button>
					${ShinyCopy(options.phrase)}
				</header>
				<textarea readonly .value="${displayText}" @click="${onClick}"></textarea>
				<div class=blanket></div>
			</div>
		</div>
	`
})

