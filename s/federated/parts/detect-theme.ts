
import {CSSResultGroup} from "@benev/slate"
import {themes} from "../themes/themes.js"

const attr = "authlocal-theme"

export function detectTheme(): CSSResultGroup {
	const element = document.querySelector(`[${attr}]`)

	if (element) {
		const name = element.getAttribute(attr)
		if (name) {
			if (name in themes)
				return themes[name as keyof typeof themes]
			else
				console.error(`authlocal theme "${name}" not found`)
		}
	}

	return themes.none
}

