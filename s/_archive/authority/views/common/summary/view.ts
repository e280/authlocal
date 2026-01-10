
import {html} from "lit"
import {view} from "@e280/sly"
import {deep, thumbprint} from "@e280/stz"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {manager} from "../../../context.js"
import {Identity} from "../../../../core/identity/types.js"

export const Summary = view(use => (identities: Identity[]) => {
	use.name("summary")
	use.styles([themeCss, stylesCss])

	const existing = new Map(
		manager.depot.identities.permits.value
			.map(permit => [permit.identity.id, permit.identity])
	)

	const overwrites = new Map(
		identities
			.filter(ident => {
				const old = existing.get(ident.id)
				return old
					? !deep.equal(old, ident)
					: false
			})
			.map(ident => [ident.id, ident])
	)

	return html`
		<ul class=identities>
			${identities.map(identity => html`
				<li x-id="${identity.id}" ?x-overwrite="${overwrites.has(identity.id)}">
					<span class=label>${identity.label}</span>
					<span class=id>${thumbprint.sigil.fromHex(identity.id)}</span>
				</li>
			`)}
		</ul>

		${overwrites.size > 0 ? html`
			<p class=overwrite>${overwrites.size} existing identity ${overwrites.size === 1 ?"label" :"labels"} will be overwritten.</p>
		` : null}
	`
})

