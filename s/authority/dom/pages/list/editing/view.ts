
import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../../theme.js"
import {Identity} from "../../../../types.js"
import {EditSubpanel} from "./subpanels/edit/view.js"
import {SeedSubpanel} from "./subpanels/seed/view.js"
import {DeleteSubpanel} from "./subpanels/delete/view.js"

type EditingTab = "edit" | "seed" | "delete"

export const Editing = shadow((options: {
		identity: Identity
		close: () => void
		updateIdentity: (identity: Identity) => void
		deleteIdentity: (identity: Identity) => void
	}) => {

	useName("editing")
	useCss(theme(), styleCss)

	const $tab = useSignal<EditingTab>("edit")

	function tabButton(tab: EditingTab) {
		return html`
			<button
				x-vibe=naked
				?data-active="${$tab() === tab}"
				@click="${() => $tab(tab)}">
					${tab}
			</button>
		`
	}

	const tabs = {
		edit: () => EditSubpanel({
			identity: options.identity,
			close: options.close,
			updateIdentity: options.updateIdentity,
		}),

		seed: () => SeedSubpanel({
			identity: options.identity,
		}),

		delete: () => DeleteSubpanel({
			identity: options.identity,
			close: options.close,
			deleteIdentity: options.deleteIdentity,
		}),
	}

	return html`
		<div class=panel>
			<header>
				<nav class=tabs aria-label="edit identity">
					${tabButton("edit")}
					${tabButton("seed")}
					${tabButton("delete")}
				</nav>
			</header>

			${tabs[$tab()]()}
		</div>
	`
})
