
import {debounce, html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../theme.css.js"

import {Summary} from "../../../../common/summary/view.js"
import {Problematic} from "../../../../common/problems/problematic.js"
import {hydrateIdentities, Identity} from "../../../../../../core/identity.js"

export type RecoveryOptions = {
	onBack: () => Promise<void>
	onSave: (identities: Identity[]) => Promise<void>
}

export const Recovery = shadowView(use => (options: RecoveryOptions) => {
	use.name("recovery")
	use.styles([themeCss, stylesCss])

	const identities = use.signal<Identity[]>([])
	const problematic = use.once(() => new Problematic())
	const hasValidIdentities = identities.value.length > 0

	const ingest = debounce(100, async() => {
		identities.value = []
		await problematic.captureProblems(async() => {
			const textarea = use.shadow.querySelector("textarea")!
			const text = textarea.value
			identities.value = await hydrateIdentities(text)
			if (text.length > 0 && identities.value.length === 0)
				problematic.add("No valid seeds detected")
		})
	})

	async function clickSave() {
		await options.onSave(identities.value)
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

			${problematic.renderProblems()}
		</section>

		${hasValidIdentities
			? Summary([identities.value])
			: null}

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			<button
				theme-button=happy
				?disabled="${!hasValidIdentities}"
				@click="${clickSave}">
					Import
			</button>
		</footer>
	`
})

