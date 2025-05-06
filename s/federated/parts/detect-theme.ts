
import {CSSResultGroup} from "@benev/slate"
import {themes} from "../themes/themes.js"

export function detectTheme(): CSSResultGroup {
	const element = document.querySelector("[authlocal-theme]")

	if (element) {
		const name = element.getAttribute("authlocal-theme")
		if (name && name in themes) {
			return themes[name as keyof typeof themes]
		}
	}

	return themes.plain
}

