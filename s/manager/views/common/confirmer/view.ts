
import {Content, debounce, html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import {inputString} from "../../../../tools/input-string.js"

export type ConfirmerOptions = {
	requiredText: string
	buttonLabel: () => Content
}

export const Confirmer = shadowView(use => (options: ConfirmerOptions) => {
	use.name("confirmer")
	use.styles(themeCss, stylesCss)

	const primed = use.signal(false)

	const onInput = debounce(100, (proposed: string) => {
		primed.value = proposed === options.requiredText
	})

	return html`
		<section theme-dangerzone>
			<slot></slot>
			<p>To confirm, enter the phrase <code>${options.requiredText}</code> exactly</p>
			<div class=box>
				<input
					type="text"
					theme-code
					@input="${inputString(onInput)}"
					/>
				<button theme-angry ?disabled="${!primed.value}">
					${options.buttonLabel()}
				</button>
			</div>
		</section>
	`
})

