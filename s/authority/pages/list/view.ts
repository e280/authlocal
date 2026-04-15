
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
						<button data-vibe=naked @click="${clickEdit}">edit</button>
					`,
				})}
			</li>
		`
	}

	return html`
		<div class=plate>
			<h2>identities on your device</h2>

			<ol>
				${options.identities.map(renderIdentity)}
			</ol>

			<nav class=appnav>
				<button
					data-vibe="naked lame"
					@click="${options.recovery}">
						recovery
				</button>

				<button
					data-vibe="happy"
					@click="${options.create}">
						new
				</button>
			</nav>
		</div>
	`
})
