
import {html} from "lit"
import {ShinyButton} from "@e280/shiny"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {CreateDraft} from "../../types.js"
import {theme} from "../../../../utils/theme.js"
import {IdPoster} from "../../../../../ui/views/id-poster/view.js"
import {deriveIdentityFromIndex} from "../../utils/derive-identity-from-index.js"

export const SelectorStep = shadow((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
	}) => {

	useName("acorn-step")
	useCss(theme(), styleCss)

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
		<div class=plate>
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

