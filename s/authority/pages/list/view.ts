
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {deriveId, Id} from "../../../lib/index.js"
import {IdCard} from "../../../ui/views/id-card/view.js"

export const ListPage = shadow((options: {
		identities: Identity[]
		create: () => void
		recovery: () => void
		edit: (id: Id) => void
	}) => {

	useName("list page")
	useCss(theme(), styleCss)

	function renderIdentity(identity: Identity) {
		const {alias} = identity
		const id = deriveId(identity.root)
		const clickEdit = () => options.edit(id)
		return html`
			<li>
				${IdCard.with({
					props: [{alias, id, copyable: true}],
					children: html`
						<button x-vibe=naked @click="${clickEdit}">edit</button>
					`,
				})}
			</li>
		`
	}

	return html`
		<div x-title>
			<h2>
				${options.identities.length === 1
					? "this identity is on your device"
					: "these identities are on your device"}
			</h2>
			<hr/>
		</div>

		<div x-plate>
			<ol>
				${options.identities.map(renderIdentity)}
			</ol>

			<nav x-nav>
				<button
					x-linky
					x-vibe=lame
					@click="${options.recovery}">
						recover
				</button>
				from a seed,

				or
				<button
					x-linky
					@click="${options.create}">
						create a new identity
				</button>

			</nav>
		</div>
	`
})
