
import {html} from "lit"
import {yay} from "@e280/stz"
import {shadow, useCss} from "@e280/sly"

import styleCss from "./style.css.js"
import {CreateDraft} from "../../types.js"
import {theme} from "../../../../utils/theme.js"
import {TextInput} from "../../../../views/text-input/view.js"
import {IdPoster} from "../../../../../ui/views/id-poster/view.js"
import {maxNameLength, validateName} from "../../../../../core/index.js"
import {deriveIdentityFromIndex} from "../../utils/derive-identity-from-index.js"

export const SelectorStep = shadow((options: {
		draft: CreateDraft
		next: () => void
		back?: () => void
		recovery?: () => void
	}) => {

	useCss(theme(), styleCss)

	const {$root, $secret, $index, $name} = options.draft
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
		const name = $name() || undefined
		return clickable
			? html`
				<button @click="${onClick}">
					${IdPoster({id, name})}
				</button>
			`
			: IdPoster({id, name})
	}

	return html`
		<div class=plate>
			<h2>choose your new identity</h2>

			${TextInput({
				maxLength: maxNameLength,
				placeholder: "optional name",
				validator: name => (name === "")
					? yay(name)
					: validateName(name),
				on: maybe => $name(maybe.yay ? maybe.value : ""),
			})}

			<div class=cards>
				${renderIdentity(true, $index() - 1)}
				${renderIdentity(false, $index())}
				${renderIdentity(true, $index() + 1)}
			</div>

			<nav>
				<div>
					<button data-vibe=lame @click="${shimmyLeft}">&lt;</button>
					<button data-vibe=happy @click="${clickChoose}">choose</button>
					<button data-vibe=lame @click="${shimmyRight}">&gt;</button>
				</div>

				<div>
					${(options.back ?? null) && html`
						<button
							data-vibe="naked lame"
							@click="${options.back}">
								back
						</button>
					`}

					<button
						data-vibe="naked lame"
						@click="${options.recovery}">
							recover existing
					</button>
				</div>
			</nav>
		</div>
	`
})

