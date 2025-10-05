
import {html} from "lit"
import {view} from "@e280/sly"
import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"
import {Flasher} from "../../../utils/flasher.js"
import {Downloader} from "../../../utils/downloader.js"

const demoSeed = `
"fakely.demoly"
 midsen.picmyn.widrep.baclut
 somreg.sivler.havrun.tapfeb
 ticpem.hanlev.topbec.lorreb
 sipsyp.sarred.dassyn.barlug
 pitber
`.trim()

export const SeedReveal = view(use => (seed: string, filename: string) => {
	use.name("seed-viewer")
	use.styles([themeCss, stylesCss])
	const $reveal = use.signal(false)

	function toggle() {
		$reveal.value = !$reveal.value
	}

	const seedDisplay = $reveal.value
		? seed // show real seed
		: demoSeed // show demo text before actual reveal

	const downloader = use.once(() => new Downloader(seed))

	const copier = use.once(() => new class Copier extends Flasher {
		async copy(text: string) {
			try {
				await navigator.clipboard.writeText(text)
				await this.flash("good")
			}
			catch (error) {
				await this.flash("bad")
			}
		}
	})

	function selectTextarea() {
		use.shadow.querySelector<HTMLTextAreaElement>("textarea")!.select()
	}

	return html`
		<div class=secretbox>
			<textarea
				theme-seed
				readonly
				autocorrect=off
				autocapitalize=off
				spellcheck=false
				.value="${seedDisplay}"
				?disabled="${!$reveal.value}"
				@click="${selectTextarea}"
			></textarea>
			<div class=blanket ?x-hide="${$reveal.value}">
				[TOP SECRET]
			</div>
		</div>

		<footer theme-buttons>
			<button
				theme-button
				theme-hush
				class=reveal
				@click="${toggle}">
				${$reveal.value
					? "Conceal"
					: "Reveal"}
			</button>

			<button
				theme-button
				theme-hush
				class="copy button"
				theme-flashing="${copier.flashing}"
				@click="${() => copier.copy(seed)}">
					Copy
			</button>

			<a class="download button"
				theme-button
				theme-flashing="${downloader.flashing}"
				href="${downloader.url}"
				download="${filename}"
				title="${`Download "${filename}"`}"
				@click="${() => downloader.flash()}">
					Download
			</a>
		</footer>
	`
})

