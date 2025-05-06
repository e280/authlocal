
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../../common/theme.css.js"

import {Summary} from "../../../../common/summary/view.js"
import {Problematic} from "../../../../common/problems/problematic.js"
import {hydrateIdentities, Identity} from "../../../../../../core/identity.js"

export type UploadOptions = {
	identities: Identity[]
	problems: string[]
	onSave: (identities: Identity[]) => Promise<void>
	onBack: () => Promise<void>
}

export const Upload = shadowView(use => (options: UploadOptions) => {
	use.name("upload")
	use.styles([themeCss, stylesCss])

	const identities = use.signal<Identity[]>(options.identities)
	const problematic = use.once(() => new Problematic())
	const hasValidPassports = identities.value.length > 0

	async function handleUpload(event: InputEvent) {
		identities.value = []
		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])
		for (const file of files) {
			await problematic.captureProblems(async() => {
				const text = await file.text()
				identities.value = await hydrateIdentities(text)
			})
		}
	}

	function accept() {
		options.onSave(identities.value)
		options.onBack()
	}

	return html`
		<section theme-group>
			<section class=uploader theme-zone>
				<input
					type="file"
					multiple
					accept=".authlocal"
					@change="${handleUpload}"
					/>
			</section>
			${problematic.renderProblems()}
		</section>

		${hasValidPassports
			? Summary([identities.value])
			: null}

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			${hasValidPassports ? html`
				<button theme-button=happy @click="${accept}">
					Import {identities.value.length === 1 ?"Identity" :"Identities"}
				</button>
			` : null}
		</footer>
	`
})

