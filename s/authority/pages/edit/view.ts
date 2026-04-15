
import {html} from "lit"
import {maybe} from "@e280/stz"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {Identity} from "../../types.js"
import {theme} from "../../utils/theme.js"
import {Tabnav} from "../../views/tabnav/view.js"
import {IdCard} from "../../../ui/views/id-card/view.js"
import {TextInput} from "../../views/text-input/view.js"
import {address, allowEmptyString, deriveId, maxNameLength, validateName} from "../../../lib/index.js"

export const EditPage = shadow((options: {
		identity: Identity
		back: () => void
		seed: () => void
		delete: () => void
		changeAlias: (alias: string) => void
	}) => {

	useName("edit page")
	useCss(theme(), styleCss)

	const id = deriveId(options.identity.root)
	const $alias = useSignal(options.identity.alias)

	return html`
		<div class=plate>
			${IdCard({id, alias: options.identity.alias, copyable: true})}

			${Tabnav({
				active: "edit",
				edit: () => {},
				seed: options.seed,
				delete: options.delete,
			})}

			${TextInput({
				placeholder: "optional alias",
				initialValue: options.identity.alias,
				maxLength: maxNameLength,
				validator: allowEmptyString(validateName),
				on: alias => $alias(maybe.get(alias) ?? address.addr(id)),
			})}

			<nav>
				<button
					x-vibe="naked lame"
					@click="${options.back}">
						back
				</button>

				<button
					x-vibe="happy"
					@click="${() => options.changeAlias($alias())}">
						save
				</button>
			</nav>
		</div>
	`
})
