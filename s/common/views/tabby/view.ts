
import {Content, html, shadowView, signal} from "@benev/slate"
import stylesCss from "./styles.css.js"
import themeCss from "../../theme.css.js"

export type Tab = {
	button: () => Content
	panel: () => Content
}

export class Tabby {
	#activeIndex = signal(0)

	constructor(public startIndex: number) {
		this.#activeIndex.value = startIndex
	}

	get activeIndex() {
		return this.#activeIndex.value
	}

	set activeIndex(index: number) {
		this.#activeIndex.value = index
	}

	goto(index: number) {
		this.#activeIndex.value = index
	}

	render(tabs: Tab[]) {
		return html`
			${Tabnav([this, tabs])}
			${tabs.at(this.activeIndex)?.panel()}
		`
	}
}

export const Tabnav = shadowView(use => (tabby: Tabby, tabs: Tab[]) => {
	use.name("tabby")
	use.styles(themeCss, stylesCss)

	return html`
		<nav>
			${tabs.map((tab, index) => html`
				<button
					x-index="${index}"
					?x-active="${index === tabby.activeIndex}"
					@click="${() => tabby.goto(index)}">
						${tab.button()}
				</button>
			`)}
		</nav>
	`
})

