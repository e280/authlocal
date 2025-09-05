
import {html} from "lit"
import {view} from "@e280/sly"
import {debounce} from "@e280/stz"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../theme.css.js"

import {Intake} from "../../intake.js"
import {Summary} from "../../../../common/summary/view.js"
import {Problems} from "../../../../common/problems/view.js"
import {Identity} from "../../../../../../trust/exports/authority.js"

export type RecoveryOptions = {
	intake: Intake
	onBack: () => Promise<void>
	onSave: (identities: Identity[]) => Promise<void>
}

export const Recovery = view(use => (options: RecoveryOptions) => {
	use.name("recovery")
	use.styles([themeCss, stylesCss])

	const {intake} = options

	const ingest = debounce(100, async() => {
		intake.clear()
		const textarea = use.shadow.querySelector("textarea")!
		const text = textarea.value
		await intake.ingestSeedText(text)
	})

	async function clickSave() {
		await options.onSave(intake.identities.value)
		await options.onBack()
	}

	return html`
		<section theme-group class=seedzone>
			<h2>Enter your recovery seed(s)</h2>

			<textarea
				theme-inputty
				theme-seedbox
				theme-seed
				autocorrect=off
				autocapitalize=off
				spellcheck=false
				@input="${ingest}"
			></textarea>

			${intake.problems.value.length > 0
				? Problems(intake.problems.value)
				: null}
		</section>

		${intake.identities.value.length > 0
			? Summary(intake.identities.value)
			: null}

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			<button
				theme-button=happy
				?disabled="${intake.identities.value.length === 0}"
				@click="${clickSave}">
					Import
			</button>
		</footer>
	`
})

