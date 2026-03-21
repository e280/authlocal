
import {html} from "lit"
import {light, useOnce, useSignal} from "@e280/sly"
import {deriveId, deriveSecret, generateSecret, moniker, sigil} from "../../../../core/index.js"
import {count} from "@e280/stz"

export const RootView = light((options: {
		name: string
		next: (root: string) => void
	}) => {

	const material = useOnce(() => generateSecret())
	const $offset = useSignal(0)
	const n = 3

	function renderIdentity(index: number) {
		const b = new Uint8Array([index])
		const root = deriveSecret(material, b)
		const id = deriveId(root)
		return html`
			<button @click="${() => options.next(root)}">
				<p>${sigil(id)}</p>
				<p>${moniker(id)}</p>
			</button>
		`
	}

	return html`
		<div class=root-view>
			<p>hey ${options.name},</p>
			<p>choose your permanent id</p>

			<div class=cards>
				${Array.from(count(n)).map(i => renderIdentity($offset() + i))}
			</div>

			<nav>
				<button @click="${() => $offset.value -= n}">⬅️</button>
				<button @click="${() => $offset.value += n}">➡️</button>
			</nav>
		</div>
	`
})

