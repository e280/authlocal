
import {html} from "lit"
import {light} from "@e280/sly"
import {ShinyButton} from "@e280/shiny"
import {CreateDraft} from "../types.js"
import {IdPoster} from "../../../../ui/views/id-poster/view.js"
import {deriveIdentityFromIndex} from "../utils/derive-indexed-draft-root.js"

export const SelectorStep = light((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
	}) => {

	const {$root, $secret, $index} = options.draft
	const selected = deriveIdentityFromIndex($secret(), $index())

	const shimmyRight = () => $index($index() + 1)
	const shimmyLeft = () => $index($index() - 1)
	const clickChoose = () => {
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
		<div data-step=selector>
			<h2>choose your new identity</h2>

			<div class=cards>
				${renderIdentity(true, $index() - 1)}
				${renderIdentity(false, $index())}
				${renderIdentity(true, $index() + 1)}
			</div>

			<nav>
				<div>
					${ShinyButton("<", {vibe: "lame", onClick: shimmyLeft})}
					${ShinyButton("choose", {vibe: "happy", onClick: clickChoose})}
					${ShinyButton(">", {vibe: "lame", onClick: shimmyRight})}
				</div>

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

