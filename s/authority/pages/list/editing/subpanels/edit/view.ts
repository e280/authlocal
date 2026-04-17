import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../../../../types.js"
import {theme} from "../../../../../utils/theme.js"
import {TextInput} from "../../../../../views/text-input/view.js"
import {allowEmptyString, maxNameLength, validateName} from "../../../../../../lib/index.js"

export const EditSubpanel = shadow((options: {
		identity: Identity
		close: () => void
		updateIdentity: (identity: Identity) => void
	}) => {

	useName("edit subpanel")
	useCss(theme(), styleCss)

	const validateAlias = allowEmptyString(validateName)
	const $aliasMaybe = useSignal(validateAlias(options.identity.alias))
	const aliasMaybe = $aliasMaybe()
	const canSaveAlias = aliasMaybe.yay && aliasMaybe.value !== options.identity.alias

	const saveAlias = () => {
		if (!aliasMaybe.yay) return
		options.updateIdentity({
			...options.identity,
			alias: aliasMaybe.value,
		})
	}

	return html`
		<section class=section>
			${TextInput({
				debounceMs: 0,
				initialValue: options.identity.alias,
				maxLength: maxNameLength,
				validator: validateAlias,
				on: aliasMaybe => $aliasMaybe(aliasMaybe),
				placeholder: "optional alias",
			})}

			<nav class=actions>
				<button
					x-vibe=happy
					?disabled="${!canSaveAlias}"
					@click="${saveAlias}">
						save
				</button>
			</nav>
		</section>
	`
})
