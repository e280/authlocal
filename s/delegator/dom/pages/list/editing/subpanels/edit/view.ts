
import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../../theme.js"
import {Identity} from "../../../../../../types.js"
import {consts} from "../../../../../../../consts.js"
import {TextInput} from "../../../../../views/text-input/view.js"
import {validateAlias} from "../../../../../../../lib/core/alco/validation/validate-alias.js"
import {allowEmptyString} from "../../../../../../../lib/core/alco/validation/allow-empty-string.js"

export const EditSubpanel = shadow((options: {
		identity: Identity
		close: () => void
		updateIdentity: (identity: Identity) => void
	}) => {

	useName("edit subpanel")
	useCss(theme(), styleCss)

	const validateAliasSpecial = allowEmptyString(validateAlias)
	const $aliasMaybe = useSignal(validateAliasSpecial(options.identity.alias))
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

			<label x-field>
				<span>change your publicly-visible username:</span>
				${TextInput({
					debounceMs: 0,
					initialValue: options.identity.alias,
					maxLength: consts.maxAliasLength,
					validator: validateAliasSpecial,
					on: aliasMaybe => $aliasMaybe(aliasMaybe),
					placeholder: "optional alias",
				})}
			</label>

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
