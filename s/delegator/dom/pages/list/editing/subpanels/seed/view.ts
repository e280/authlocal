import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../../theme.js"
import {Identity} from "../../../../../../types.js"
import {seed} from "../../../../../../../lib/core/ergo/seed/seed.js"
import {RecoverySeed} from "../../../../../views/recovery-seed/view.js"
import {deriveId} from "../../../../../../../lib/core/cryp/derive-id.js"
import {addressMoniker} from "../../../../../../../lib/core/ergo/address/moniker.js"

export const SeedSubpanel = shadow((options: {
		identity: Identity
	}) => {

	useName("seed subpanel")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const moniker = addressMoniker(id)
	const seedText = seed(options.identity.root)

	return html`
		<section class=section>
			<p>this seed fully restores <code>${moniker}</code>.</p>
			<p><strong>keep it safe. keep it secret.</strong></p>
			${RecoverySeed({seedText})}
		</section>
	`
})

