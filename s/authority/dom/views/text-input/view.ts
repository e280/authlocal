
import {html} from "lit"
import {debounce, maybe, Maybe, Validator} from "@e280/stz"
import {shadow, useCss, useName, useOnce, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../theme.js"

export const TextInput = shadow((options: {
		validator: Validator<string>
		on: (maybe: Maybe<string>) => void
		textarea?: boolean
		maxLength?: number
		debounceMs?: number
		placeholder?: string
		initialValue?: string
	}) => {

	useName("text-input")
	useCss(theme(), styleCss)

	const $problems = useSignal<string[] | undefined>(undefined)
	const problems = $problems()
	
	const update = useOnce(() => debounce(
		options.debounceMs ?? 100,
		(value: string) => {
			const m = options.validator(value)
			$problems(maybe.problems(m))
			options.on(m)
		},
	))

	const onInput = (event: Event) => update(
		(event.currentTarget as HTMLInputElement | HTMLTextAreaElement).value
	)

	return html`
		<div class=box ?data-problems="${!!problems}">
			${options.textarea ? html`
				<textarea
					part="input textarea"
					placeholder="${options.placeholder}"
					maxlength="${options.maxLength}"
					.value="${options.initialValue ?? ""}"
					@input="${onInput}"
				></textarea>
			` : html`
				<input
					type=text
					part="input text"
					placeholder="${options.placeholder}"
					maxlength="${options.maxLength}"
					.value="${options.initialValue ?? ""}"
					@input="${onInput}"
				/>
			`}

			<p class=problems>
				${problems && problems.map(problem => `• ${problem}`).join(" ")}
			</p>
		</div>
	`
})
