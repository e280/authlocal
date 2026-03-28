
import {html} from "lit"
import {shadow, useCss, useDerived, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {Bank} from "../../sys/bank.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {TextInput} from "../../views/text-input/view.js"
import {allowEmptyString, deriveId, maxNameLength, nomen, seed, validateName} from "../../../core/index.js"
import { IdPoster } from "../../../ui/views/id-poster/view.js"

export const RecoveryPage = shadow((options: {
		bank: Bank
		back: () => void
		done: (identity: Identity) => void
	}) => {

	useName("import page")
	useCss(theme(), styleCss)

	const $name = useSignal("")
	const $root = useSignal("")
	const $identity = useDerived<Identity | null>(() => {
		const root = $root()
		if (root === "") return null
		const name = $name() || nomen.nom(deriveId(root))
		return {root, name}
	})

	const identity = $identity()

	function done() {
		const root = $root()
		const name = $name() || nomen.nom(deriveId(root))
		options.done({root, name})
	}

	return html`
		<h2>paste your recovery seed</h2>

		<div class=inputs>
			${TextInput({
				maxLength: maxNameLength,
				placeholder: "optional name",
				validator: allowEmptyString(validateName),
				on: name => $name(name.yay ? name.value : ""),
			})}

			${TextInput({
				textarea: true,
				placeholder: "seed",
				validator: allowEmptyString(seed.parse),
				on: root => $root(root.yay ? root.value : ""),
			})}
		</div>

		${identity
			? IdPoster({
				name: identity.name,
				id: deriveId(identity.root),
			})
			: null}

		<nav>
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

