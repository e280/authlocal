
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../theme.css.js"

import {constants} from "../../../../../../constants.js"
import {IngressEndeavor} from "../../endeavor.js"
import {Summary} from "../../../../common/summary/view.js"
import {hydrateIdentities, Identity} from "../../../../../../core/identity.js"

export type UploadOptions = {
	endeavor: IngressEndeavor
	onSave: (identities: Identity[]) => Promise<void>
	onBack: () => Promise<void>
}

export const Upload = shadowView(use => (options: UploadOptions) => {
	use.name("upload")
	use.styles([themeCss, stylesCss])

	const {identities, problematic, validIdentityCount} = options.endeavor

	async function handleUpload(event: InputEvent) {
		identities.value = []
		problematic.clear()

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
					accept="${constants.seedExtension}"
					@change="${handleUpload}"
					/>
			</section>
			${problematic.renderProblems()}
		</section>

		${validIdentityCount
			? Summary([identities.value])
			: null}

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			${validIdentityCount ? html`
				<button theme-button=happy @click="${accept}">
					Import ${identities.value.length === 1 ?"Identity" :"Identities"}
				</button>
			` : null}
		</footer>
	`
})

