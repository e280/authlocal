
import {html} from "lit"
import {count} from "@e280/stz"
import {light} from "@e280/sly"
import {CreateDraft} from "../view.js"
import {deriveId, moniker, sigil} from "../../../../core/index.js"
import {deriveIndexedDraftRoot} from "../utils/generate-id-draft.js"

export const RootView = light((options: {
		draft: CreateDraft
		next: () => void
		back: () => void
	}) => {

	const n = 3
	const {$name, $root, $secret, $page} = options.draft

	function renderIdentity(index: number) {
		const root = deriveIndexedDraftRoot($secret(), index)
		const id = deriveId(root)
		const onClick = () => {
			$root(root)
			options.next()
		}
		return html`
			<button @click="${onClick}">
				<p>${sigil(id)}</p>
				<p>${moniker(id)}</p>
			</button>
		`
	}

	return html`
		<div class=root-view>
			<p>hey ${$name()},</p>
			<p>choose your permanent id</p>

			<div class=cards>
				${Array.from(count(n)).map(i => renderIdentity(($page() * n) + i))}
			</div>

			<nav>
				<button @click="${options.back}">back</button>
				<button @click="${() => $page.value--}">⬅️</button>
				<span>${$page()}</span>
				<button @click="${() => $page.value++}">➡️</button>
			</nav>
		</div>
	`
})

