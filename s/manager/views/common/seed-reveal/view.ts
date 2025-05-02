
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import {Flasher} from "../../../../common/utils/flasher.js"

const demoSeed = `
"fakely.demoly"
	midsen.picmyn.widrep.baclut
	somreg.sivler.havrun.tapfeb
	ticpem.hanlev.topbec.lorreb
	sipsyp.sarred.dassyn.barlug
	pitber
`.replaceAll("\t", "  ").trim()

export const SeedReveal = shadowView(use => (seed: string, filename: string) => {
	use.name("seed-viewer")
	use.styles([themeCss, stylesCss])
	const reveal = use.signal(false)

	function toggle() {
		reveal.value = !reveal.value
	}

	const seedDisplay = reveal.value
		? seed // show real seed
		: demoSeed // show demo text before actual reveal

	const downloader = use.once(() => new class Downloader extends Flasher {
		url: string | undefined

		updateUrl() {

			// dispose previous object url
			if (this.url) URL.revokeObjectURL(this.url)

			// generate new object url
			const blob = new Blob([`\n${seed}\n\n`], {type: "text/plain"})
			this.url = URL.createObjectURL(blob)
		}
	})

	downloader.updateUrl()

	const copier = use.once(() => new class Copier extends Flasher {
		async copy(text: string) {
			try {
				await navigator.clipboard.writeText(text)
				this.status.value = "good"
				this.reset()
			}
			catch (error) {
				this.status.value = "bad"
				this.reset()
			}
		}
	})

	function selectTextarea() {
		use.shadow.querySelector<HTMLTextAreaElement>("textarea")!.select()
	}

	return html`
		<section>
			<div class=box theme-seed-box>
				<textarea readonly theme-seed-text
					.value="${seedDisplay}"
					?disabled="${!reveal.value}"
					@click="${selectTextarea}"
				></textarea>
				<div class=blanket ?x-hide="${reveal.value}">
					[TOP SECRET]
				</div>
			</div>

			<footer theme-buttons>
				<button class="copy button flasher"
					@click="${() => copier.copy(seed)}"
					theme-flasher="${copier.status.value}">
						Copy
				</button>

				<a class="download button flasher"
					href="${downloader.url}"
					download="${filename}"
					@click="${() => downloader.flash(true)}"
					theme-flasher="${downloader.status.value}">
						Download
				</a>

				<button class=reveal @click="${toggle}">
					${reveal.value
						? "Conceal"
						: "Reveal"}
				</button>
			</footer>
		</section>
	`
})

