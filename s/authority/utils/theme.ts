
import {dom} from "@e280/sly"

let cached: CSSStyleSheet[] | null = null

export function theme() {
	if (cached) return cached

	cached = []

	for (const style of dom.all<HTMLStyleElement>("style[data-theme]", document.head)) {
		if (!style.sheet) continue
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(style.textContent ?? "")
		cached.push(sheet)
	}

	return cached
}

