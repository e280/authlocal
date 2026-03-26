
import {html} from "lit"
import {debounce} from "@e280/stz"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {maxNameLength, validateName, yay} from "../../../core/index.js"

export const NameInput = shadow((onChange: (name: string | null) => void) => {
	useName("name-input")
	useCss(theme(), styleCss)

	const $name = useSignal<string>("")
	const $problems = useSignal<string[] | null>(null)
	const problems = $problems()

	const update = debounce(200, (name: string) => {
		const previous = $name()
		$name(name)
		if (name === previous) return
		const maybe = validateName(name)
		if (name === "" || yay.is(maybe)) {
			$problems(null)
			onChange(name)
		}
		else {
			$problems(maybe.problems)
			onChange(name)
		}
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
			maxlength="${maxNameLength}"
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

