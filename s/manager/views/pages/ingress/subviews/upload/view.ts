
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../../common/theme.css.js"

import {idPreview} from "../../../../../../tools/id-preview.js"
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
	const problems = use.signal<string[]>(options.problems)

	async function handleUpload(event: InputEvent) {
		passports.value = []
		problems.value = []

		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])

		for (const file of files) {
			try {
				const text = await file.text()
				passports.value = await hydratePassports(text)
			}
			catch (error) {
				problems.value = [
					(error instanceof Error)
						? `${error.name}: ${error.message}`
						: "invalid file",
				]
			}
		}
	}

	function accept() {
		options.onSave(passports.value)
		options.onBack()
	}

	return html`
		<section theme-zone>
			<input
				type="file"
				multiple
				accept=".authlocal"
				@change="${handleUpload}"
				/>
		</section>

		<section theme-group>
			${problems.value.length > 0 ? html`
				<div class=problems></div>
			` : null}

			${passports.value.length > 0 ? html`
				<ul class=passports>
					${passports.value.map(passport => html`
						<li x-id="${passport.id}">
							${passport.label} (${idPreview(passport.id)})
						</li>
					`)}
				</ul>
			` : null}

			<footer theme-buttons>
				<button
					theme-button=back
					@click="${options.onBack}">
						Back
				</button>

				${passports.value.length > 0 ? html`
					<button theme-button=happy @click="${accept}">
						Import Passport${passports.value.length === 1 ?"" :"s"}
					</button>
				` : null}

				<button theme-button=happy @click="${accept}">
					Import Passport${passports.value.length === 1 ?"" :"s"}
				</button>
			</footer>
		</section>
	`
})

