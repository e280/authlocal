import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"

export const Tabnav = shadow((options: {
		active: "edit" | "seed" | "delete"
		edit: () => void
		seed: () => void
		delete: () => void
	}) => {

	useName("tabnav")
	useCss(theme(), styleCss)

	return html`
		<nav>
			<button
				x-vibe="naked"
				?data-active="${options.active === "edit"}"
				@click="${options.edit}">
					edit
			</button>

			<button
				x-vibe="naked"
				?data-active="${options.active === "seed"}"
				@click="${options.seed}">
					seed
			</button>

			<button
				x-vibe="naked"
				?data-active="${options.active === "delete"}"
				@click="${options.delete}">
					delete
			</button>
		</nav>
	`
})
