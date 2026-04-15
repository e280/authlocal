
import {html} from "lit"
import {shadow, useCss, useDerived, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {TextInput} from "../../views/text-input/view.js"
import {IdPoster} from "../../../ui/views/id-poster/view.js"
import {address, allowEmptyString, deriveId, maxNameLength, seed, validateName} from "../../../lib/index.js"

export const RecoveryPage = shadow((options: {
		back: () => void
		done: (identity: Identity) => void
	}) => {

	useName("import page")
	useCss(theme(), styleCss)

	const $alias = useSignal("")
	const $root = useSignal("")
	const $identity = useDerived<Identity | null>(() => {
		const root = $root()
		if (root === "") return null
		const alias = $alias() || address.addr(deriveId(root))
		return {root, alias}
	})

	const identity = $identity()

	function done() {
		const root = $root()
		const alias = $alias() || address.addr(deriveId(root))
		options.done({root, alias})
	}

	return html`
		<h2>paste your recovery seed</h2>

		<div class=inputs>
			${TextInput({
				maxLength: maxNameLength,
				placeholder: "optional alias",
				validator: allowEmptyString(validateName),
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

		<nav class=appnav>
			<button data-vibe="naked lame" @click="${options.back}">
				back
			</button>

			<button
				data-vibe="happy"
				?disabled="${!$root()}"
				@click="${done}">
					recover
			</button>
		</nav>
	`
})
