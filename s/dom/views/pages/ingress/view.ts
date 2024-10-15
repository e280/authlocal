
import {html} from "@benev/slate"
import stylesCss from "./styles.css.js"
import {nexus} from "../../../nexus.js"
import {Authfile} from "../../../../auth/file.js"
import {Identity} from "../../../../auth/types.js"
import {Situation} from "../../../logic/situation.js"
import {Breakdown} from "../../common/breakdown/view.js"

export const IngressPage = nexus.shadowView(use => (situation: Situation.Ingress) => {
	use.styles(stylesCss)

	const stage = use.signal(new Map<string, Identity>())

	async function handleUpload(event: InputEvent) {
		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])

		stage.value.clear()
		stage.publish()

		for (const file of files) {
			const text = await file.text()
			const idfile = Authfile.decode(text)
			for (const identity of idfile.identities)
				stage.value.set(identity.thumbprint, identity)
		}

		stage.publish()
	}

	function accept() {
		situation.onAddIdentities([...stage.value.values()])
		situation.onBack()
	}

	return html`
		<section>
			<h2>Upload your identities</h2>
			<input type="file" multiple accept=".authduo" @change="${handleUpload}"/>
			${Breakdown([[...stage.value.values()]])}
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onBack}">Cancel</button>
			<button class=happy ?disabled="${stage.value.size === 0}" @click="${accept}">Import Identities</button>
		</footer>
	`
})

