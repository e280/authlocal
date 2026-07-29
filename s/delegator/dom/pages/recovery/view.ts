
import {html} from "lit"
import {shadow, useCss, useDerived, useName, useSignal} from "@e280/sly"

import {theme} from "../../theme.js"
import styleCss from "./style.css.js"
import {Identity} from "../../../types.js"
import {consts} from "../../../../consts.js"
import {TextInput} from "../../views/text-input/view.js"
import {Poster} from "../../../../lib/ui/views/poster/view.js"
import {deriveId} from "../../../../lib/core/cryp/derive-id.js"
import {address, seed, validateAlias} from "../../../../lib/core/index.js"
import {allowEmptyString} from "../../../../lib/core/alco/validation/allow-empty-string.js"

export const RecoveryPage = shadow((options: {
		back: () => void
		done: (identity: Identity) => void
	}) => {

	useName("recovery page")
	useCss(theme(), styleCss)

	const $alias = useSignal("")
	const $root = useSignal("")
	const $identity = useDerived<Identity | null>(() => {
		const root = $root()
		if (root === "") return null
		const alias = $alias() || address.moniker(deriveId(root))
		return {root, alias}
	})

	const identity = $identity()

	function done() {
		const root = $root()
		const alias = $alias() || address.moniker(deriveId(root))
		options.done({root, alias})
	}

	return html`
		<div x-title>
			<h2>paste your recovery seed</h2>
			<hr/>
		</div>

		<div x-plate>
			<div class=inputs>
				${TextInput({
					maxLength: consts.maxAliasLength,
					placeholder: "optional alias",
					validator: allowEmptyString(validateAlias),
					on: alias => $alias(alias.yay ? alias.value : ""),
				})}

				${TextInput({
					textarea: true,
					placeholder: "recovery seed",
					validator: allowEmptyString(seed.parse),
					on: root => $root(root.yay ? root.value : ""),
				})}
			</div>

			${identity
				? Poster(deriveId(identity.root), identity.alias)
				: null}

			<nav x-nav>
				go
				<button x-linky x-vibe=lame @click="${options.back}">
					back
				</button>,

				or
				<button
					x-linky
					?disabled="${!$root()}"
					@click="${done}">
						claim the identity
				</button>
			</nav>
		</div>
	`
})

