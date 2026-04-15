import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {Tabnav} from "../../views/tabnav/view.js"
import {IdCard} from "../../../ui/views/id-card/view.js"
import {address, deriveId, seed} from "../../../lib/index.js"
import {RecoverySeed} from "../../views/recovery-seed/view.js"

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
	const short = address.short(id)
	const seedText = seed.from(options.identity.root)

	return html`
		<div x-plate>
			${IdCard({id, alias: options.identity.alias, copyable: true})}

			${Tabnav({
				active: "seed",
				edit: options.edit,
				seed: options.seed,
				delete: options.delete,
			})}

			${RecoverySeed({seedText})}

			<div class=content>
				<p>this seed fully restores "${short}".</p>
				<p>keep it secret. keep it safe.</p>
			</div>

			<nav>
				<button
					x-vibe="naked lame"
					@click="${options.back}">
						back
				</button>
			</nav>
		</div>
	`
})
