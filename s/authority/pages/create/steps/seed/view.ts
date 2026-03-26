
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {shadow, useCss, useDerived, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {CreateDraft} from "../../types.js"
import {theme} from "../../../../utils/theme.js"
import {seed, deriveId, nom} from "../../../../../core/index.js"

const fakeSeed = `
fakely fakers
dedyak befbef gidvyx mamryd
burdyb pidmyn lentak kemlex
demkex purzen sallak lidmac
nidwyn yabmer vemfek wursyr
`.trim()

export const SeedStep = shadow((options: {
		draft: CreateDraft
		next: () => void
		back: () => void
	}) => {

	useCss(theme(), styleCss)

	const root = options.draft.$root()
	const $id = useDerived(() => deriveId(options.draft.$root()))
	const $nom = useDerived(() => nom($id()))

	const secretSeed = seed(root)
	const $checked = useSignal(false)
	const $concealed = useSignal(true)
	const displayText = $concealed() ? fakeSeed : secretSeed

	const onClick = (e: Event) => (e.currentTarget as HTMLTextAreaElement).select()
	const onCheck = (e: Event) => $checked((e.currentTarget as HTMLInputElement).checked)
	const toggleConceal = () => $concealed(!$concealed())

	return html`
		<div class=plate>
			<div class=content>
				<h2>save your recovery seed</h2>
				<p>if you lose it, "${$nom()}" is gone <em>forever</em></p>
			</div>

			<div class=concealer>
				<div class=codebox ?data-concealed="${$concealed()}">
					<header>
						<button @click="${toggleConceal}">${$concealed() ? "reveal" : "conceal"}</button>
						${ShinyCopy(secretSeed)}
					</header>
					<textarea readonly .value="${displayText}" @click="${onClick}"></textarea>
					<div class=blanket>CONCEALED</div>
				</div>
			</div>

			<label class=checkbox>
				<input type=checkbox @change="${onCheck}"/>
				<span>i saved this somewhere safe</span>
			</label>

			<nav>
				<button data-vibe=lame @click="${options.back}">back</button>
				<button @click="${options.next}" ?disabled="${!$checked()}">done</button>
			</nav>
		</div>
	`
})

