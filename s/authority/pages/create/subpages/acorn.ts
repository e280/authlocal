
import {html} from "lit"
import {light} from "@e280/sly"
import {ShinyCopy} from "@e280/shiny"
import {acorn, deriveId, sigil} from "../../../../core/index.js"

export const AcornView = light((options: {
		name: string
		root: string
		next: () => void
	}) => {

	const id = deriveId(options.root)
	const secretText = acorn(options.root)

	return html`
		<div class=acorn-view>
			<p>${options.name}</p>
			<p>${sigil(id)}</p>
			<div>
				<header>${ShinyCopy(secretText)}</header>
				<textarea readonly .value="${secretText}"></textarea>
			</div>
			<button @click="${options.next}">done</button>
		</div>
	`
})

