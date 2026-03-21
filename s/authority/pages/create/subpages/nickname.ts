
import {html} from "lit"
import {when} from "lit/directives/when.js"
import {light, useDerived, useSignal} from "@e280/sly"
import {nay, validateLabel, yay} from "../../../../core/index.js"

export const NicknameView = light((done: (name: string) => void) => {
	const $value = useSignal("")
	const $nameMaybe = useDerived(() => validateLabel($value()))
	const problems = nay.problems($nameMaybe())

	const onInput = (event: InputEvent) => {
		const {value} = event.currentTarget as HTMLInputElement
		$value(value)
	}

	const onClick = () => {
		const name = yay.get($nameMaybe())
		if (name) done(name)
	}

	return html`
		<label>
			<span>choose your public nickname:</span>
			<input type="text" @input="${onInput}"/>
			${when(problems, problems => html`
				<ol class="problems">
					${problems.map(problem => html`
						<li>${problem}</li>
					`)}
				</ol>
			`)}
		</label>

		<nav>
			<button @click="${onClick}" ?disabled="${nay.is($nameMaybe())}">next</button>
		</nav>
	`
})

