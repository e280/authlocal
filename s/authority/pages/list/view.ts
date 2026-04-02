
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {deriveId, Id} from "../../../core/index.js"
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
		const {name} = identity
		const id = deriveId(identity.root)
		const clickEdit = () => options.edit(id)
		return html`
			<li>
				${IdCard.with({
					props: [{name, id, copyable: true}],
					children: html`
						<button data-vibe=naked @click="${clickEdit}">edit</button>
					`,
				})}
			</li>
		`
	}

	return html`
		<h2>your identities</h2>

		<ol>
			${options.identities.map(renderIdentity)}
		</ol>

		<nav>
			<button
				data-vibe="naked lame"
				@click="${options.recovery}">
					recover existing
			</button>

			<button
				data-vibe="happy"
				@click="${options.create}">
					new
			</button>
		</nav>
	`
})

