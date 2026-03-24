
import {html} from "lit"
import {light} from "@e280/sly"
import {ShinyButton} from "@e280/shiny"
import {CreateDraft} from "../view.js"
import {sigil} from "../../../../core/index.js"
import {IdPoster} from "../../../../ui/views/id-poster/view.js"
import {deriveIdentityFromIndex} from "../utils/derive-indexed-draft-root.js"

export const RootStep = light((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
	}) => {

	const {$root, $secret, $index} = options.draft
	const selected = deriveIdentityFromIndex($secret(), $index())

	function onChoose() {
		$root(selected.root)
		options.next()
	}

	function renderIdentity(clickable: boolean, index: number) {
		const {id} = deriveIdentityFromIndex($secret(), index)
		const onClick = () => $index(index)
		return clickable
			? html`
				<button @click="${onClick}">
					${IdPoster({id})}
				</button>
			`
			: IdPoster({id})
	}

	return html`
		<div data-step=root>
			<h2>choose your new identity</h2>

			<div class=cards>
				${renderIdentity(true, $index() - 1)}
				${renderIdentity(false, $index())}
				${renderIdentity(true, $index() + 1)}
			</div>

			<nav>
				${ShinyButton(`choose ${sigil(selected.id)}`, {vibe: "happy", onClick: onChoose})}

				${(options.back ?? null) && html`
					<div>
						<span class=boring>or go</span>
						<button data-vibe=cancel @click="${options.back}">back</button>
					</div>
				`}
			</nav>

		</div>
	`
})

