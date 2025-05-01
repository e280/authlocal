
import {html, shadowView, signal} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import { debounce } from "@e280/stz"
import { Flasher } from "../../../../common/utils/flasher.js"

const demoSeed = `
"fakely.demoly"
	midsen.picmyn.widrep.baclut
	somreg.sivler.havrun.tapfeb
	ticpem.hanlev.topbec.lorreb
	sipsyp.sarred.dassyn.barlug
	pitber
`.replaceAll("\t", "  ").trim()

export const SeedReveal = shadowView(use => (passportsSeed: string, count: number) => {
	use.name("seed-viewer")
	use.styles([themeCss, stylesCss])
	const reveal = use.signal(false)

	function toggle() {
		reveal.value = !reveal.value
	}

	const seedDisplay = reveal.value
		? passportsSeed // show real seed
		: demoSeed // show demo text before actual reveal

	const downloader = use.once(() => new class Downloader extends Flasher {
		url: string | undefined

		updateUrl() {

			// dispose previous object url
			if (this.url) URL.revokeObjectURL(this.url)

			// generate new object url
			const blob = new Blob([`\n${passportsSeed}\n\n`], {type: "text/plain"})
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

	return html`
		<section>
			<div class=box>
				<textarea readonly .value="${seedDisplay}"></textarea>
				<div class=blanket ?x-hide="${reveal.value}"></div>
			</div>

			<footer theme-buttons>
				<button class=reveal @click="${toggle}">
					${reveal.value
						? "👁️ Hide Seed"
						: "👁️ Reveal Seed"}
				</button>

				<button class="copy button flasher"
					@click="${() => copier.copy(passportsSeed)}"
					x-flasher="${copier.status.value}">
						📋 Copy to Clipboard
				</button>

				<a class="download button flasher"
					href="${downloader.url}"
					download="passport${count === 1 ?"" :"s"}.authlocal"
					@click="${() => downloader.flash(true)}"
					x-flasher="${downloader.status.value}">
						💾 Download as File
				</a>
			</footer>
		</section>
	`
})

