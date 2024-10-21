
import {html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import {theme} from "../../../../common/theme.js"
import {Situation} from "../../../logic/situation.js"
import {Idfile} from "../../../../common/auth/idfile.js"
import {Breakdown} from "../../common/breakdown/view.js"
import {Identity} from "../../../../common/auth/identity.js"

export const IngressPage = shadowView(use => (situation: Situation.Ingress) => {
	use.styles([theme, stylesCss])

	const identities = use.signal<Identity[]>([])

	async function handleUpload(event: InputEvent) {
		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])

		identities.value = []

		for (const file of files) {
			try {
				const text = await file.text()
				const idfile = Idfile.fromJson(JSON.parse(text))
				identities.value = [...identities.value, ...idfile.list()]
			}
			catch {}
		}
	}

	function accept() {
		situation.onAddIdentities(identities.value)
		situation.onBack()
	}

	return html`
		<section>
			<h2>Import identities from your device.</h2>
			<input type="file" multiple accept=".id" @change="${handleUpload}"/>
			${identities.value.length > 0 ? html`
				${Breakdown([identities.value])}
			` : null}
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onBack}">Cancel</button>
			<button
				class=happy
				?disabled="${identities.value.length === 0}"
				@click="${accept}">
					Import Identities
			</button>
		</footer>
	`
})

