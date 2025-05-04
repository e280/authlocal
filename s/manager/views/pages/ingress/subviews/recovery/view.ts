
import {debounce, html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../../common/theme.css.js"

import {Problematic} from "../problems/problematic.js"
import {hydratePassports, Passport} from "../../../../../../core/passport.js"

export type RecoveryOptions = {
	onBack: () => Promise<void>
	onSave: (passports: Passport[]) => Promise<void>
}

export const Recovery = shadowView(use => (options: RecoveryOptions) => {
	use.name("recovery")
	use.styles([themeCss, stylesCss])

	const passports = use.signal<Passport[]>([])
	const problematic = use.once(() => new Problematic())
	const hasValidPassports = passports.value.length > 0

	const ingest = debounce(100, async() => {
		await problematic.captureProblems(async() => {
			const textarea = use.shadow.querySelector("textarea")!
			const text = textarea.value
			passports.value = await hydratePassports(text)
			if (text.length > 0 && passports.value.length === 0)
				problematic.add("No valid seeds detected")
		})
	})

	async function clickSave() {
		await options.onSave(passports.value)
		await options.onBack()
	}

	return html`
		<section theme-group>
			<section theme-zone=seed>
				<h2>Enter your recovery seed(s)</h2>
				<textarea
					theme-inputty
					theme-seed
					@input="${ingest}"
				></textarea>
			</section>

			${problematic.renderProblems()}
		</section>

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			<button
				theme-button=happy
				?disabled="${!hasValidPassports}"
				@click="${clickSave}">
					Import
			</button>
		</footer>
	`
})

