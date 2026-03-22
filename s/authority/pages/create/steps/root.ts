
import {html} from "lit"
import {count} from "@e280/stz"
import {light} from "@e280/sly"
import {CreateDraft} from "../view.js"
import {deriveId} from "../../../../core/index.js"
import {IdCard} from "../../../../ui/views/id-card/view.js"
import {deriveIndexedDraftRoot} from "../utils/derive-indexed-draft-root.js"

export const RootStep = light((options: {
		draft: CreateDraft
		next: () => void
		back: () => void
	}) => {

	const n = 3
	const {$root, $secret, $page} = options.draft

	function renderIdentity(index: number) {
		const name = options.draft.$name()
		const root = deriveIndexedDraftRoot($secret(), index)
		const id = deriveId(root)
		const onClick = () => {
			$root(root)
			options.next()
		}
		return html`
			<button @click="${onClick}">
				${IdCard({id, name})}
			</button>
		`
	}

	return html`
		<div data-step=root>
			<h2>choose your permanent id</h2>

			<div class=cards>
				${Array.from(count(n)).map(i => renderIdentity(($page() * n) + i))}
			</div>

			<nav>
				<button data-vibe=cancel @click="${options.back}">back</button>
				<button @click="${() => $page.value--}">⬅️</button>
				<span>${$page()}</span>
				<button @click="${() => $page.value++}">➡️</button>
			</nav>
		</div>
	`
})

