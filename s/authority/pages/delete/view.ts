import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Identity} from "../../types.js"
import {IdCard} from "../../../ui/views/id-card/view.js"
import {addr, deriveId} from "../../../core/index.js"
import {Tabnav} from "../../views/tabnav/view.js"

export const DeletePage = shadow((options: {
		identity: Identity
		back: () => void
		edit: () => void
		seed: () => void
		deleteTab: () => void
		delete: () => void
	}) => {

	useName("delete page")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const address = addr(id)
	const $confirmation = useSignal("")
	const primed = $confirmation() === address

	const onInput = (event: Event) => {
		$confirmation((event.currentTarget as HTMLInputElement).value)
	}

	return html`
		<div class=plate>
			${IdCard({id, alias: options.identity.alias, copyable: true})}

			${Tabnav({
				active: "delete",
				edit: options.edit,
				seed: options.seed,
				delete: options.deleteTab,
			})}

			<section class=warning>
				<h2>delete identity</h2>
				<p><strong>this is permanent.</strong> deleting this identity removes it from this device.</p>

				<div class=confirm>
					<label for=confirm-delete>type <code>${address}</code> exactly to confirm deletion</label>
					<input
						id=confirm-delete
						type=text
						placeholder="${address}"
						autocomplete=off
						spellcheck=false
						@input="${onInput}"
					/>
				</div>
			</section>


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
