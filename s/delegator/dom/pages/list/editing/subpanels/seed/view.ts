import {html} from "lit"
import {shadowView, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../../theme.js"
import {Identity} from "../../../../../../types.js"
import {RecoverySeed} from "../../../../../views/recovery-seed/view.js"
import {deriveId} from "../../../../../../../lib/core/cryp/derive-id.js"
import {seedphrase} from "../../../../../../../lib/core/ergo/seed/seedphrase.js"
import {addressMoniker} from "../../../../../../../lib/core/ergo/address/moniker.js"

export const SeedSubpanel = shadowView((options: {
		identity: Identity
	}) => {

	useName("seed subpanel")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.secret)
	const moniker = addressMoniker(id)
	const seedText = seedphrase(options.identity.secret)

	return html`
		<section class=section>
			<p>this seed fully restores <code>${moniker}</code>.</p>
			<p><strong>keep it safe. keep it secret.</strong></p>
			${RecoverySeed({seedText})}
		</section>
	`
})

