
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {light, useSignal} from "@e280/sly"
import {CreateDraft} from "../view.js"
import {acorn, deriveId, sigil} from "../../../../core/index.js"

export const AcornStep = light((options: {
		draft: CreateDraft
		next: () => void
		back: () => void
	}) => {

	const {$root, $name} = options.draft
	const id = deriveId($root())
	const secretText = acorn($root())
	const $checked = useSignal(false)

	const onClick = (e: Event) => (e.currentTarget as HTMLTextAreaElement).select()
	const onCheck = (e: Event) => $checked((e.currentTarget as HTMLInputElement).checked)

	return html`
		<div data-step=acorn>
			<div>
				<p>hey ${$name()},</p>
				<p>${sigil(id)}</p>
			</div>

			<div>
				<header>${ShinyCopy(secretText)}</header>
				<textarea readonly .value="${secretText}" @click="${onClick}"></textarea>
			</div>

			<div>
				<label>
					<input type="checkbox" @change="${onCheck}"/>
					<span>i kept this safe</span>
				</label>
			</div>

			<nav>
				<button @click="${options.back}">back</button>
				<button @click="${options.next}" ?disabled="${!$checked()}">done</button>
			</nav>
		</div>
	`
})

