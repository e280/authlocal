import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {IdPoster} from "../../../ui/views/id-poster/view.js"
import {deriveId, nomen, seed} from "../../../core/index.js"
import {RecoverySeed} from "../../views/recovery-seed/view.js"

export const SeedPage = shadow((options: {
		identity: Identity
		back: () => void
	}) => {

	useName("seed page")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const nom = nomen.nom(id)
	const seedText = seed.from(options.identity.root)

	return html`
		<div class=plate>
			<div class=content>
				<h2>view recovery seed</h2>
				<p>this seed fully restores "${nom}". keep it offline and private.</p>
			</div>

			${IdPoster({id, name: options.identity.name, copyable: true})}
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
