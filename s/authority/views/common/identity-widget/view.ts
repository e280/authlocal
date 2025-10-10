
import {html} from "lit"
import {Content, view} from "@e280/sly"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"
import userIcon from "../../../../app/icons/tabler/user.icon.js"

import {IdentityDraft} from "./draft.js"
import {idHsl} from "../../../../app/utils/id-hue.js"
import {svgLit} from "../../../../app/utils/svg-lit.js"
import {Identity} from "../../../../core/identity/types.js"
import {inputString} from "../../../../app/utils/input-string.js"
import {maxLabelLength} from "../../../../app/utils/validation.js"

export type IdentityWidgetOptions = {
	editable?: boolean
	selected?: boolean
	onClick?: () => void
}

export function identityWidget(identity: Identity) {
	const draft = new IdentityDraft(identity)
	return IdentityWidget(draft) as Content
}

export const IdentityWidget = view(use => (
		draft: IdentityDraft,
		options: IdentityWidgetOptions = {},
	) => {

	use.name("identity-widget")
	use.styles([themeCss, stylesCss])

	function handleCardClick(event: MouseEvent) {
		if (!options.onClick) return undefined
		const slot = use.shadow.querySelector("slot")!
		if (!event.composedPath().includes(slot)) {
			options.onClick()
		}
	}

	const invalid = !draft.getValidEditedIdentity()

	return html`
		<section>
			<div class=card
				?x-editable="${!!options.editable}"
				?x-clickable="${!!options.onClick}"
				?x-selected="${!!options.selected}"
				?x-angry="${invalid}"
				@click="${handleCardClick}">

				<div class=icon style="color: ${idHsl(draft.identity.id)};">
					${svgLit(userIcon)}
				</div>

				${options.editable ? html`
					<input
						type=text
						class=label
						theme-inputty
						theme-insetty
						.value="${draft.getEditedLabel()}"
						maxlength="${maxLabelLength}"
						?theme-angry="${invalid}"
						@input="${inputString(label => { draft.setEditedLabel(label) })}"
						/>
				` : html`
					<div class="text label" theme-input-border>${draft.getEditedLabel()}</div>
				`}

				<slot></slot>
			</div>

			<div class=id>
				<auth-sigil hex="${draft.identity.id}"></auth-sigil>
			</div>
		</section>
	`
})

