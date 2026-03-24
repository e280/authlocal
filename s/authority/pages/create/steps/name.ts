
import {html} from "lit"
import {when} from "lit/directives/when.js"
import {light, useDerived, useSignal} from "@e280/sly"
import {CreateDraft} from "../view.js"
import {deriveId, nay, sigil, validateLabel, yay} from "../../../../core/index.js"

export const NameStep = light((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
	}) => {

	const $value = useSignal(options.draft.$name() ?? sigil(deriveId(options.draft.$root())))
	const $nameMaybe = useDerived(() => validateLabel($value() ?? ""))
	const problems = nay.problems($nameMaybe())

	const onInput = (event: InputEvent) => {
		const {value} = event.currentTarget as HTMLInputElement
		$value(value)
	}

	const onClick = () => {
		const name = yay.get($nameMaybe())
		if (name) {
			options.draft.$name(name)
			options.next()
		}
	}

	return html`
		<div data-step=name>
			<h2>choose your public nickname</h2>

			<input type="text" .value="${$value()}" @input="${onInput}"/>
			${when(problems, problems => html`
				<ol class="problems">
					${problems.map(problem => html`
						<li>${problem}</li>
					`)}
				</ol>
			`)}

			<nav>
				${options.back && html`
					<button @click="${options.back}">back</button>
				`}
				<button @click="${onClick}" ?disabled="${nay.is($nameMaybe())}">next</button>
			</nav>
		</div>
	`
})

