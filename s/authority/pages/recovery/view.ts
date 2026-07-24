
import {html} from "lit"
import {shadow, useCss, useDerived, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {TextInput} from "../../views/text-input/view.js"
import {IdPoster} from "../../../ui/views/id-poster/view.js"
import {address, allowEmptyString, deriveId, maxNameLength, seed, validateAlias} from "../../../lib/index.js"

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
					maxLength: maxNameLength,
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
				? IdPoster({
					alias: identity.alias,
					id: deriveId(identity.root),
				})
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
