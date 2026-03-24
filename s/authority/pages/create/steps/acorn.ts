
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

	const root = options.draft.$root()
	const id = deriveId(root)

	const secretText = acorn(root)
	const $checked = useSignal(false)

	const onClick = (e: Event) => (e.currentTarget as HTMLTextAreaElement).select()
	const onCheck = (e: Event) => $checked((e.currentTarget as HTMLInputElement).checked)

	return html`
		<div data-step=acorn>
			<div>
				<h2>save your recovery code</h2>
				<p>otherwise, it'll be gone <em>forever.</em></p>
			</div>

			<div>
				<p>for "${sigil(id)}"</p>
				<header>${ShinyCopy(secretText)}</header>
				<textarea readonly .value="${secretText}" @click="${onClick}"></textarea>
			</div>

			<label class=checkbox>
				<input type="checkbox" @change="${onCheck}"/>
				<span>i kept it safe and secret.</span>
			</label>

			<nav>
				<button data-vibe=cancel @click="${options.back}">back</button>
				<button @click="${options.next}" ?disabled="${!$checked()}">done</button>
			</nav>
		</div>
	`
})

