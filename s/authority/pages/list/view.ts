
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {Bank} from "../../sys/bank.js"
import {theme} from "../../utils/theme.js"
import {deriveId} from "../../../core/index.js"
import {IdCard} from "../../../ui/views/id-card/view.js"

export const ListPage = shadow((options: {
		bank: Bank
		create: () => void
	}) => {

	useName("list page")
	useCss(theme(), styleCss)

	return html`
		<h2>your identities</h2>

		<ol>
			${options.bank.$identities().map(identity => html`
				<li>
					${IdCard({
						name: identity.name,
						id: deriveId(identity.root),
						copyable: true,
					})}
				</li>
			`)}
		</ol>

		<nav>
			<button @click="${options.create}">new identity</button>
		</nav>
	`
})

