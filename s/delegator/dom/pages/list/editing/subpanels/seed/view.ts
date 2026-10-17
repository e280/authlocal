import {html} from "lit"
import {shadowView, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../../../theme.js"
import {Identity} from "../../../../../../types.js"
import {RecoverySeed} from "../../../../../views/recovery-seed/view.js"
import {seedphrase} from "../../../../../../../lib/core/ergo/seed/seedphrase.js"
import {addressMoniker} from "../../../../../../../lib/core/ergo/address/moniker.js"
import { seedId } from "../../../../../../../lib/core/ergo/seed/seed-id.js"

export const SeedSubpanel = shadowView((options: {
		identity: Identity
	}) => {

	useName("seed subpanel")
	useCss(theme(), styleCss)

	const id = seedId(options.identity.seed)
	const moniker = addressMoniker(id)
	const phrase = seedphrase(options.identity.seed)

	return html`
		<section class=section>
			<p>this seed fully restores <code>${moniker}</code>.</p>
			<p><strong>keep it safe. keep it secret.</strong></p>
			${RecoverySeed({phrase})}
		</section>
	`
})

