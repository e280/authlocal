
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../../common/theme.css.js"

import {Summary} from "../../../../common/summary/view.js"
import {Problematic} from "../../../../common/problems/problematic.js"
import {hydratePassports, Passport} from "../../../../../../core/passport.js"

export type UploadOptions = {
	passports: Passport[]
	problems: string[]
	onSave: (passports: Passport[]) => Promise<void>
	onBack: () => Promise<void>
}

export const Upload = shadowView(use => (options: UploadOptions) => {
	use.name("upload")
	use.styles([themeCss, stylesCss])

	const passports = use.signal<Passport[]>(options.passports)
	const problematic = use.once(() => new Problematic())
	const hasValidPassports = passports.value.length > 0

	async function handleUpload(event: InputEvent) {
		passports.value = []
		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])
		for (const file of files) {
			await problematic.captureProblems(async() => {
				const text = await file.text()
				passports.value = await hydratePassports(text)
			})
		}
	}

	function accept() {
		options.onSave(passports.value)
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
			? Summary([passports.value])
			: null}

		<footer theme-buttons>
			<button
				theme-button=back
				@click="${options.onBack}">
					Back
			</button>

			${hasValidPassports ? html`
				<button theme-button=happy @click="${accept}">
					Import Passport${passports.value.length === 1 ?"" :"s"}
				</button>
			` : null}
		</footer>
	`
})

