
import {html} from "lit"
import {debounce} from "@e280/stz"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {validateLabel, yay} from "../../../core/index.js"

export const NameInput = shadow((onChange: (name: string | null) => void) => {
	useName("name-input")
	useCss(theme(), styleCss)

	const $name = useSignal<string>("")
	const $problems = useSignal<string[] | null>(null)
	const problems = $problems()

	const update = debounce(200, (name: string) => {
		const previous = $name()
		if (name === previous) return
		$name(name)
		if (name === "") {
			$problems(null)
			return
		}
		const maybe = validateLabel(name)
		if (yay.is(maybe)) {
			$problems(null)
		}
		else {
			$problems(maybe.problems)
		}
		onChange($name())
	})

	const onInput = (event: Event) => {
		const input = event.currentTarget as HTMLInputElement
		update(input.value)
	}

	return html`
		<input
			type=text
			part=input
			placeholder="optional name"
			.value="${$name()}"
			@input="${onInput}"/>

		${problems && html`
			<ol class=problems>
				${problems.map(p => html`
					<li>${p}</li>
				`)}
			</ol>
		`}
	`
})

