
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {Identity} from "../../../types.js"
import {theme} from "../../../utils/theme.js"

export const Editing = shadow((options: {
		identity: Identity
		close: () => void
		updateIdentity: (identity: Identity) => void
		deleteIdentity: (identity: Identity) => void
	}) => {

	useName("editing")
	useCss(theme(), styleCss)

	// TODO
	// - previously we had separate 'edit', 'seed', and 'delete' pages.
	// - but now, we're moving all three of those capabilities into this single 'editing' panel here.
	// - this editing panel needs to have the tabs at the top-left for edit/seed/delete that has the same functionality as the old pages.
	// - at the top right of this editing panel, we should have a subtle X button to close the editing panel.
	// - note that this editing panel will inherit the --color css var which should be used similar to how "../ident/style.css.ts" uses it

	return html`
		<div>(editing panel)</div>
	`
})

