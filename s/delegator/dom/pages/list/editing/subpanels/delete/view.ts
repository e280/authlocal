import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../../theme.js"
import {Identity} from "../../../../../../types.js"
import {deriveId} from "../../../../../../../lib/core/cryp/derive-id.js"
import {addressMoniker} from "../../../../../../../lib/core/ergo/address/moniker.js"

export const DeleteSubpanel = shadow((options: {
		identity: Identity
		close: () => void
		deleteIdentity: (identity: Identity) => void
	}) => {

	useName("delete subpanel")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const moniker = addressMoniker(id)
	const $confirmation = useSignal("")
	const canDelete = $confirmation() === moniker

	const onConfirmationInput = (event: Event) => {
		$confirmation((event.currentTarget as HTMLInputElement).value)
	}

	const deleteIdentity = () => {
		if (!canDelete) return
		options.deleteIdentity(options.identity)
		options.close()
	}

	return html`
		<section class=warning>
			<p>
				<strong>this is permanent.</strong>
				<br/>
				<span>deleting this identity removes it from this device.</span>
			</p>

			<label x-field>
				<span>type <code>${moniker}</code> exactly to confirm:</span>
				<input
					class=input
					type=text
					placeholder="type to confirm"
					autocomplete=off
					spellcheck=false
					.value="${$confirmation()}"
					@input="${onConfirmationInput}"
				/>
			</label>

			<nav class=actions>
				<button
					x-vibe=angry
					?disabled="${!canDelete}"
					@click="${deleteIdentity}">
						delete forever
				</button>
			</nav>
		</section>
	`
})
