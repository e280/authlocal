import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {IdCard} from "../../../ui/views/id-card/view.js"
import {deriveId, nomen, seed} from "../../../core/index.js"
import {RecoverySeed} from "../../views/recovery-seed/view.js"
import {Tabnav} from "../../views/tabnav/view.js"

export const SeedPage = shadow((options: {
		identity: Identity
		back: () => void
		edit: () => void
		seed: () => void
		delete: () => void
	}) => {

	useName("seed page")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const nom = nomen.nom(id)
	const seedText = seed.from(options.identity.root)

	return html`
		<div class=plate>
			${IdCard({id, name: options.identity.name, copyable: true})}

			${Tabnav({
				active: "seed",
				edit: options.edit,
				seed: options.seed,
				delete: options.delete,
			})}

			<div class=content>
				<p>this seed fully restores "${nom}". keep it secret. keep it safe.</p>
			</div>

			${RecoverySeed({seedText})}

			<nav>
				<button
					data-vibe="naked lame"
					@click="${options.back}">
						back
				</button>
			</nav>
		</div>
	`
})
