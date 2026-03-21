
import {html} from "lit"
import {when} from "lit/directives/when.js"
import {light, useDerived, useSignal} from "@e280/sly"
import {nay, validateLabel, yay} from "../../../../core/index.js"

export const NameView = light((options: {
		name: string
		next: (name: string) => void
	}) => {

	const $value = useSignal(options.name)
	const $nameMaybe = useDerived(() => validateLabel($value()))
	const problems = nay.problems($nameMaybe())

	const onInput = (event: InputEvent) => {
		const {value} = event.currentTarget as HTMLInputElement
		$value(value)
	}

	const onClick = () => {
		const name = yay.get($nameMaybe())
		if (name) options.next(name)
	}

	return html`
		<div class=name-view>
			<label>
				<span>choose your public nickname:</span>
				<input type="text" .value="${$value()}" @input="${onInput}"/>
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
		</div>
	`
})

