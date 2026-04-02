
import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {TextInput} from "../../views/text-input/view.js"
import {IdPoster} from "../../../ui/views/id-poster/view.js"
import {allowEmptyString, deriveId, maxNameLength, nomen, validateName} from "../../../core/index.js"
import { maybe } from "@e280/stz"

export const EditPage = shadow((options: {
		identity: Identity
		back: () => void
		seed: () => void
		delete: () => void
		changeName: (name: string) => void
	}) => {

	useName("edit page")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const $name = useSignal(options.identity.name)

	return html`
		<div class=plate>
			<h2>edit identity</h2>

			${IdPoster({id, name: $name(), copyable: true})}

			${TextInput({
				placeholder: "optional name",
				maxLength: maxNameLength,
				validator: allowEmptyString(validateName),
				on: name => $name(maybe.get(name) ?? nomen.nom(id)),
			})}

			<nav>
				<button
					data-vibe="naked"
					@click="${options.seed}">
						seed
				</button>

				<button
					data-vibe="naked angry"
					@click="${options.delete}">
						delete
				</button>
			</nav>

			<nav>
				<button
					data-vibe="naked lame"
					@click="${options.back}">
						back
				</button>

				<button
					data-vibe="happy"
					@click="${() => options.changeName($name())}">
						save
				</button>
			</nav>
		</div>
	`
})
