
import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {Bank} from "../../sys/bank.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {TextInput} from "../../views/text-input/view.js"
import {allowEmptyString, deriveId, maxNameLength, nomen, seed, validateName} from "../../../core/index.js"

export const RecoveryPage = shadow((options: {
		bank: Bank
		back: () => void
		done: (identity: Identity) => void
	}) => {

	useName("import page")
	useCss(theme(), styleCss)

	const $name = useSignal("")
	const $root = useSignal("")

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

		<nav>
			<button data-vibe="naked lame" @click="${options.back}">
				back
			</button>

			<button
				data-vibe="happy"
				?disabled="${!$root()}"
				@click="${done}">
					done
			</button>
		</nav>
	`
})

