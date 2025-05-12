
import {html} from "@benev/slate"

/** split up a hostname with spans for better word-breaking */
export function hostcode(appOrigin: string) {
	const {hostname} = new URL(appOrigin)
	return html`
		<code theme-code=login>
			${hostname
				.split(".")
				.map((part, index) => index === 0
					? html`<span>${part}</span>`
					: html`<span>.${part}</span>`)}
		</code>
	`
}

