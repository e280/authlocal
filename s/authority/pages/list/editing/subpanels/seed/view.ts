import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../../../../types.js"
import {theme} from "../../../../../utils/theme.js"
import {RecoverySeed} from "../../../../../views/recovery-seed/view.js"
import {address, deriveId, seed} from "../../../../../../lib/index.js"

export const SeedSubpanel = shadow((options: {
		identity: Identity
	}) => {

	useName("seed subpanel")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const short = address.moniker(id)
	const seedText = seed.from(options.identity.root)

	return html`
		<section class=section>
			<p class=hint>this seed fully restores <code>${short}</code>.</p>
			<p class=hint>keep it safe. keep it secret.</p>
			${RecoverySeed({seedText})}
		</section>
	`
})
