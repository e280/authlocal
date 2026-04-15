
import {html} from "lit"
import {yay} from "@e280/stz"
import {shadow, useCss} from "@e280/sly"

import styleCss from "./style.css.js"
import {CreateDraft} from "../../types.js"
import {theme} from "../../../../utils/theme.js"
import {TextInput} from "../../../../views/text-input/view.js"
import {IdPoster} from "../../../../../ui/views/id-poster/view.js"
import {maxNameLength, validateName} from "../../../../../lib/index.js"
import {deriveIdentityFromIndex} from "../../utils/derive-identity-from-index.js"

export const SelectorStep = shadow((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
		recovery?: () => void
	}) => {

	useCss(theme(), styleCss)

	const {$root, $secret, $index, $alias} = options.draft
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
		const alias = $alias() || undefined
		return clickable
			? html`
				<button @click="${onClick}">
					${IdPoster({id, alias})}
				</button>
			`
			: IdPoster({id, alias})
	}

	return html`
		<div x-title>
			<h2>choose your identity</h2>
			<hr/>
		</div>

		<div x-plate>
			<div class=slice>
				${TextInput({
					maxLength: maxNameLength,
					placeholder: "optional alias",
					validator: alias => (alias === "")
						? yay(alias)
						: validateName(alias),
					on: maybe => $alias(maybe.yay ? maybe.value : ""),
				})}
			</div>

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

			<nav x-nav>
				${(options.back ?? null) && html`
					go
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
					@click="${options.recovery}">
						recover
				</button>
				from a seed
			</nav>
		</div>
	`
})
