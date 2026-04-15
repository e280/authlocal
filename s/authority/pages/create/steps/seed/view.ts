
import {html} from "lit"
import {shadow, useCss, useDerived, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {CreateDraft} from "../../types.js"
import {theme} from "../../../../utils/theme.js"
import {address, seed, deriveId} from "../../../../../lib/index.js"
import {RecoverySeed} from "../../../../views/recovery-seed/view.js"

export const SeedStep = shadow((options: {
		draft: CreateDraft
		next: () => void
		back: () => void
	}) => {

	useCss(theme(), styleCss)

	const root = options.draft.$root()
	const $id = useDerived(() => deriveId(options.draft.$root()))
	const $addr = useDerived(() => address.addr($id()))

	const seedText = seed.from(root)
	const $checked = useSignal(false)

	const onCheck = (e: Event) => $checked((e.currentTarget as HTMLInputElement).checked)

	return html`
		<div class=plate>
			<h2>save your recovery seed</h2>

			<div class=container>
				<p>if you lose it, "${$addr()}" is gone <em>forever</em></p>

				${RecoverySeed({seedText})}

				<label class=checkbox>
					<input type=checkbox @change="${onCheck}"/>
					<span>i saved this somewhere safe</span>
				</label>
			</div>

			<nav class=appnav>
				<button
					data-vibe="naked lame"
					@click="${options.back}">
						back
				</button>

				<button
					data-vibe="happy"
					@click="${options.next}"
					?disabled="${!$checked()}">
						done
				</button>
			</nav>
		</div>
	`
})
