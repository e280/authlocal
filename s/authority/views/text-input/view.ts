
import {html} from "lit"
import {debounce} from "@e280/stz"
import {shadow, useCss, useName, useOnce, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Maybe, nay, Validator} from "../../../core/index.js"

export const TextInput = shadow((options: {
		maxLength: number
		placeholder: string
		validator: Validator<string>
		on: (maybe: Maybe<string>) => void
		debounceMs?: number
	}) => {

	useName("text-input")
	useCss(theme(), styleCss)

	const $problems = useSignal<string[] | undefined>(undefined)
	const problems = $problems()
	
	const update = useOnce(() => debounce(
		options.debounceMs ?? 100,
		(value: string) => {
			const maybe = options.validator(value)
			$problems(nay.problems(maybe))
			options.on(maybe)
		},
	))

	const onInput = (event: Event) => update(
		(event.currentTarget as HTMLInputElement).value
	)

	return html`
		<div class=box ?data-problems="${!!problems}">
			<input
				type=text
				part=input
				placeholder="${options.placeholder}"
				maxlength="${options.maxLength}"
				@input="${onInput}"/>

			<p class=problems>
				${problems && problems.map(problem => `• ${problem}`).join(" ")}
			</p>
		</div>
	`
})

