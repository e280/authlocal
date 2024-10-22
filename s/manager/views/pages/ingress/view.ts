
import {html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import {Passport} from "../../../../auth/passport.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {Breakdown} from "../../common/breakdown/view.js"
import {PassportsFile} from "../../../../auth/passports-file.js"

export const IngressPage = shadowView(use => (situation: Situation.Ingress) => {
	use.styles([themeCss, stylesCss])

	const passports = use.signal<Passport[]>([])
	const problems = use.signal<string[]>([])

	async function handleUpload(event: InputEvent) {
		const input = event.currentTarget as HTMLInputElement
		const files = Array.from(input.files ?? [])

		passports.value = []
		problems.value = []

		for (const file of files) {
			try {
				const text = await file.text()
				const passportsFile = PassportsFile.fromJson(JSON.parse(text))
				passports.value = [...passports.value, ...passportsFile.list()]
			}
			catch {
				problems.value = [...problems.value, `error with file "${file.name}"`]
			}
		}
	}

	function accept() {
		situation.onAddPassports(passports.value)
		situation.onBack()
	}

	return html`
		<section>
			<h2>Import passports from your device.</h2>

			<input
				type="file"
				multiple
				accept=".${PassportsFile.extension}"
				@change="${handleUpload}"
				/>

			${problems.value.length > 0 ? html`
				<ol class=problems>
					${problems.value.map(problem => html`
						<li>${problem}</li>
					`)}
				</ol>
			` : null}

			${passports.value.length > 0 ? html`
				${Breakdown([passports.value])}
			` : null}
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onBack}">Cancel</button>
			<button
				class=happy
				?disabled="${passports.value.length === 0}"
				@click="${accept}">
					Import Passports
			</button>
		</footer>
	`
})

