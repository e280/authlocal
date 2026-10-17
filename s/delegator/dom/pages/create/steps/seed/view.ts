
import {html} from "lit"
import {shadowView, useCss, useDerived, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../theme.js"
import {CreateDraft} from "../../types.js"
import {RecoverySeed} from "../../../../views/recovery-seed/view.js"
import {deriveId} from "../../../../../../lib/core/cryp/derive-id.js"
import {seedphrase} from "../../../../../../lib/core/ergo/seed/seedphrase.js"
import {addressMoniker} from "../../../../../../lib/core/ergo/address/moniker.js"
import {secretize} from "../../../../../../lib/core/ergo/seed/secretize.js"

export const SeedStep = shadowView((options: {
		draft: CreateDraft
		next: () => void
		back: () => void
	}) => {

	useCss(theme(), styleCss)

	const secret = options.draft.$seed()
	const $id = useDerived(() => deriveId(secretize(options.draft.$seed())))
	const $short = useDerived(() => addressMoniker($id()))

	const seedText = seedphrase(secret)
	const $checked = useSignal(false)

	const onCheck = (e: Event) => $checked((e.currentTarget as HTMLInputElement).checked)

	return html`
		<div x-title>
			<h2>save your recovery seed</h2>
			<hr/>
		</div>

		<div x-plate>
			<div class=container>
				<p>if you lose it, "${$short()}" is gone <em>forever</em></p>

				${RecoverySeed({seedText})}

				<label class=checkbox>
					<input type=checkbox @change="${onCheck}"/>
					<span>i saved this somewhere safe</span>
				</label>
			</div>

			<nav x-nav>
				go
				<button
					x-linky
					x-vibe=lame
					@click="${options.back}">
						back
				</button>,

				or
				<button
					x-linky
					@click="${options.next}"
					?disabled="${!$checked()}">
						save your new identity
				</button>
			</nav>
		</div>
	`
})

