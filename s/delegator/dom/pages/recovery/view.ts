
import {html} from "lit"
import {shadowView, useCss, useDerived, useName, useSignal} from "@e280/sly"

import {theme} from "../../theme.js"
import styleCss from "./style.css.js"
import {Identity} from "../../../types.js"
import {consts} from "../../../../consts.js"
import {TextInput} from "../../views/text-input/view.js"
import {Poster} from "../../../../lib/ui/views/poster/view.js"
import {seedId} from "../../../../lib/core/ergo/seed/seed-id.js"
import {parseSeedphrase} from "../../../../lib/core/ergo/seed/parse-seedphrase.js"
import {addressMoniker} from "../../../../lib/core/ergo/address/moniker.js"
import {validateAlias} from "../../../../lib/core/alco/validation/validate-alias.js"
import {allowEmptyString} from "../../../../lib/core/alco/validation/allow-empty-string.js"

export const RecoveryPage = shadowView((options: {
		back: () => void
		done: (identity: Identity) => void
	}) => {

	useName("recovery page")
	useCss(theme(), styleCss)

	const $alias = useSignal("")
	const $seed = useSignal("")
	const $identity = useDerived<Identity | null>(() => {
		const seed = $seed()
		if (seed === "") return null
		const alias = $alias() || addressMoniker(seedId(seed))
		return {seed, alias}
	})

	const identity = $identity()

	function done() {
		const seed = $seed()
		const alias = $alias() || addressMoniker(seedId(seed))
		options.done({seed, alias})
	}

	return html`
		<div x-title>
			<h2>paste your recovery seed</h2>
			<hr/>
		</div>

		<div x-plate>
			<div class=inputs>
				${TextInput({
					maxLength: consts.maxAliasLength,
					placeholder: "optional alias",
					validator: allowEmptyString(validateAlias),
					on: alias => $alias(alias.yay ? alias.value : ""),
				})}

				${TextInput({
					textarea: true,
					placeholder: "recovery seed",
					validator: allowEmptyString(parseSeedphrase),
					on: secret => $seed(secret.yay ? secret.value : ""),
				})}
			</div>

			${identity
				? Poster({id: seedId(identity.seed), alias: identity.alias})
				: null}

			<nav x-nav>
				go
				<button x-linky x-vibe=lame @click="${options.back}">
					back
				</button>,

				or
				<button
					x-linky
					?disabled="${!$seed()}"
					@click="${done}">
						claim the identity
				</button>
			</nav>
		</div>
	`
})

