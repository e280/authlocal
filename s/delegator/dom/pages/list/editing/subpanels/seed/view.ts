import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../../theme.js"
import {Identity} from "../../../../../../types.js"
import {RecoverySeed} from "../../../../../views/recovery-seed/view.js"
import {address, deriveId, seed} from "../../../../../../../lib/core/index.js"

export const SeedSubpanel = shadow((options: {
		identity: Identity
	}) => {

	useName("seed subpanel")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const moniker = address.moniker(id)
	const seedText = seed.from(options.identity.root)

	return html`
		<section class=section>
			<p>this seed fully restores <code>${moniker}</code>.</p>
			<p><strong>keep it safe. keep it secret.</strong></p>
			${RecoverySeed({seedText})}
		</section>
	`
})

