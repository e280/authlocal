
import {html} from "lit"
import {shadow, useCss} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../theme.js"
import {CreateDraft} from "../../types.js"
import {Poster} from "../../../../../../lib/ui/views/poster/view.js"
import {deriveIdentityFromIndex} from "../../utils/derive-identity-from-index.js"

export const SelectorStep = shadow((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
		recovery?: () => void
	}) => {

	useCss(theme(), styleCss)

	const {$baseSecret, $secret, $index, $alias} = options.draft
	const selected = deriveIdentityFromIndex($baseSecret(), $index())

	const shimmyRight = () => $index($index() + 1)
	const shimmyLeft = () => $index($index() - 1)
	const clickChoose = () => {
		$secret(selected.secret)
		options.next()
	}

	function renderIdentity(clickable: boolean, index: number) {
		const {id} = deriveIdentityFromIndex($baseSecret(), index)
		const onClick = () => $index(index)
		const alias = $alias() || undefined
		return clickable
			? html`
				<button @click="${onClick}">
					${Poster({id, alias})}
				</button>
			`
			: Poster({id, alias})
	}

	return html`
		<div x-title>
			<h2>choose your identity</h2>
			<hr/>
		</div>

		<div x-plate>
			<div class=selbox>
				<div class=cards>
					${renderIdentity(true, $index() - 1)}
					${renderIdentity(false, $index())}
					${renderIdentity(true, $index() + 1)}
				</div>

				<nav class="slice buttons">
					<button x-vibe=lame @click="${shimmyLeft}">&lt;</button>
					<button x-vibe=happy @click="${clickChoose}">choose</button>
					<button x-vibe=lame @click="${shimmyRight}">&gt;</button>
				</nav>
			</div>

			<nav x-nav>
				${(options.back ?? null) && html`
					or go
					<button
						x-linky
						x-vibe=lame
						@click="${options.back}">
							back
					</button>,
				`}

				or
				<button
					x-linky
					x-vibe=lame
					@click="${options.recovery}">
						recover
				</button>
				from a seed
			</nav>
		</div>
	`
})

