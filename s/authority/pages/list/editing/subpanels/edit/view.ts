import {html} from "lit"
import {maybe} from "@e280/stz"
import {shadow, useCss, useName, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../../../../types.js"
import {theme} from "../../../../../utils/theme.js"
import {allowEmptyString, maxNameLength, validateName} from "../../../../../../lib/index.js"

export const EditSubpanel = shadow((options: {
		identity: Identity
		close: () => void
		updateIdentity: (identity: Identity) => void
	}) => {

	useName("edit subpanel")
	useCss(theme(), styleCss)

	const $alias = useSignal(options.identity.alias)
	const aliasMaybe = allowEmptyString(validateName)($alias())
	const aliasProblems = maybe.problems(aliasMaybe)
	const canSaveAlias = aliasMaybe.yay && $alias() !== options.identity.alias

	const onAliasInput = (event: Event) => {
		$alias((event.currentTarget as HTMLInputElement).value)
	}

	const saveAlias = () => {
		if (!aliasMaybe.yay) return
		options.updateIdentity({
			...options.identity,
			alias: $alias(),
		})
		options.close()
	}

	return html`
		<section class=section>
			<label class=field>
				<input
					class=input
					type=text
					placeholder="optional alias"
					maxlength="${maxNameLength}"
					.value="${$alias()}"
					@input="${onAliasInput}"
				/>
			</label>

			<p class=problems>${aliasProblems?.map(problem => `• ${problem}`).join(" ") ?? ""}</p>

			<nav class=actions>
				<button
					x-vibe=happy
					?disabled="${!canSaveAlias}"
					@click="${saveAlias}">
						save
				</button>
			</nav>
		</section>
	`
})
