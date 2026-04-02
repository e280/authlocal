import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Identity} from "../../types.js"
import {IdPoster} from "../../../ui/views/id-poster/view.js"
import {deriveId, nomen} from "../../../core/index.js"

export const DeletePage = shadow((options: {
		identity: Identity
		back: () => void
		delete: () => void
	}) => {

	useName("delete page")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const nom = nomen.nom(id)
	const $confirmation = useSignal("")
	const primed = $confirmation() === nom

	const onInput = (event: Event) => {
		$confirmation((event.currentTarget as HTMLInputElement).value)
	}

	return html`
		<div class=plate>
			<section class=warning>
				<h2>delete identity</h2>
				<p><strong>this is permanent.</strong> deleting this identity removes it from this device.</p>
				<p>you will only get it back if you still have the recovery seed for <code>${nom}</code>.</p>
				<p>if you are not absolutely sure, back out now.</p>
			</section>

			${IdPoster({id, name: options.identity.name, copyable: true})}

			<div class=confirm>
				<label for=confirm-delete>type <code>${nom}</code> exactly to confirm deletion</label>
				<input
					id=confirm-delete
					type=text
					placeholder="${nom}"
					autocomplete=off
					spellcheck=false
					@input="${onInput}"
				/>
			</div>

			<nav>
				<button
					data-vibe="naked lame"
					@click="${options.back}">
						back
				</button>

				<button
					data-vibe="angry"
					?disabled="${!primed}"
					@click="${options.delete}">
						delete forever
				</button>
			</nav>
		</div>
	`
})
