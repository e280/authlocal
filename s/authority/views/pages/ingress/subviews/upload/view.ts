
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../theme.css.js"

import {Intake} from "../../intake.js"
import {constants} from "../../../../../../constants.js"
import {Summary} from "../../../../common/summary/view.js"
import {Problems} from "../../../../common/problems/view.js"
import {Identity} from "../../../../../../core/exports/authority.js"

export type UploadOptions = {
	intake: Intake
	onSave: (identities: Identity[]) => Promise<void>
	onBack: () => Promise<void>
}

export const Upload = shadowView(use => (options: UploadOptions) => {
	use.name("upload")
	use.styles([themeCss, stylesCss])

	const {intake} = options

	async function handleUpload(event: InputEvent) {
		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])
		await intake.ingestFiles(files)
	}

	function accept() {
		options.onSave(intake.identities.value)
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
			${intake.problems.value.length > 0
				? Problems([intake.problems.value])
				: null}
		</section>

		${intake.identities.value.length > 0
			? Summary([intake.identities.value])
			: null}

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			${intake.identities.value.length > 0 ? html`
				<button theme-button=happy @click="${accept}">
					Import ${intake.identities.value.length === 1 ?"Identity" :"Identities"}
				</button>
			` : null}
		</footer>
	`
})

