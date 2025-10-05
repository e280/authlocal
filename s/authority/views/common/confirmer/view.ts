
import {html} from "lit"
import {debounce} from "@e280/stz"
import {Content, view} from "@e280/sly"
import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"
import {inputString} from "../../../../tools/input-string.js"

export type ConfirmerOptions = {
	requiredText: string
	buttonLabel: () => Content
	onConfirmed: () => void
}

export const Confirmer = view(use => (options: ConfirmerOptions) => {
	use.name("confirmer")
	use.styles(themeCss, stylesCss)

	const $primed = use.signal(false)

	const onInput = use.once(() => debounce(100, (proposed: string) => {
		$primed.value = proposed === options.requiredText
	}))

	function clickConfirm() {
		if ($primed.value)
			options.onConfirmed()
	}

	return html`
		<p>To confirm, enter <code theme-code>${options.requiredText}</code> exactly</p>
		<div class=box>

			<input
				type="text"
				theme-inputty
				theme-insetty
				@input="${inputString(onInput)}"
				/>

			<button theme-button theme-loud theme-angry
				?disabled="${!$primed.value}"
				@click="${clickConfirm}">
					${options.buttonLabel()}
			</button>
		</div>
	`
})

