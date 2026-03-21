
import {html} from "lit"
import {light} from "@e280/sly"
import {acorn, deriveId, sigil} from "../../../../core/index.js"

export const AcornView = light((options: {
		name: string
		root: string
		next: () => void
	}) => {

	const id = deriveId(options.root)

	return html`
		<div class=acorn-view>
			<p>${options.name}</p>
			<p>${sigil(id)}</p>
			<div>
				<header>copy</header>
				<textarea>${acorn(options.root)}</textarea>
			</div>
			<button @click="${options.next}">done</button>
		</div>
	`
})

