
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {theme} from "../../../../common/theme.js"
import {Situation} from "../../../logic/situation.js"
import {Identity} from "../../../../common/auth/identity.js"
import {IdentityEditor} from "../../common/identity-editor/view.js"

export const CreatePage = shadowView(use => (situation: Situation.Create) => {
	use.styles([theme, stylesCss])

	const identity = use.signal<Identity | null>(situation.identity)

	function save() {
		if (identity.value)
			situation.onComplete(identity.value)
	}

	return html`
		${IdentityEditor([{
			identity: situation.identity,
			onUpdate: updated => identity.value = updated,
		}])}

		<section>
			<p>After you've created an identity, you should export it to your computer as a backup.</p>
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onCancel}">Cancel</button>
			<button class=happy ?disabled="${!identity.value}" @click="${save}">Create Identity</button>
		</footer>
	`
})

