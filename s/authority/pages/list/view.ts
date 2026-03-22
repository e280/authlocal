
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"
import {Bank} from "../../bank.js"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {deriveId, moniker} from "../../../core/index.js"

export const ListPage = shadow((options: {
		bank: Bank
		create: () => void
	}) => {

	useName("create page")
	useCss(theme(), styleCss)

	return html`
		<h2>your identities</h2>

		<ul>
			${options.bank.$identities().map(identity => html`
				<li>
					<h4>${identity.name}</h4>
					<p>${moniker(deriveId(identity.root))}</p>
				</li>
			`)}
		</ul>

		<nav>
			<button @click="${options.create}">new identity</button>
		</nav>
	`
})

