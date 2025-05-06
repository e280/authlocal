
import {html, shadowView, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {IdentityDraft} from "./draft.js"
import {Identity} from "../../../../core/identity.js"
import {idHue} from "../../../../common/utils/id-hue.js"
import {inputString} from "../../../../tools/input-string.js"
import {renderId} from "../../../../common/views/id/render-id.js"
import {maxLabelLength} from "../../../../common/utils/validation.js"

import userIcon from "../../../../common/icons/tabler/user.icon.js"

export type IdentityWidgetOptions = {
	editable?: boolean
	selected?: boolean
	onClick?: () => void
}

export function identityWidget(identity: Identity) {
	const draft = new IdentityDraft(identity)
	return IdentityWidget([draft])
}

export const IdentityWidget = shadowView(use => (
		draft: IdentityDraft,
		options: IdentityWidgetOptions = {},
	) => {

	use.name("identity-widget")
	use.styles([themeCss, stylesCss])

	const hsl = `hsl(${idHue(draft.identity.id)}deg, 100%, 75%)`

	function handleCardClick(event: MouseEvent) {
		if (!options.onClick) return undefined
		const slot = use.shadow.querySelector("slot")!
		if (!event.composedPath().includes(slot)) {
			options.onClick()
		}
	}

	return html`
		<section>
			<div class=card
				?x-editable="${!!options.editable}"
				?x-clickable="${!!options.onClick}"
				?x-selected="${!!options.selected}"
				@click="${handleCardClick}">

				<div class=icon style="color: ${hsl};">
					${svgSlate(userIcon)}
				</div>

				${options.editable ? html`
					<input
						type=text
						class=label
						theme-inputty
						theme-insetty
						.value="${draft.getEditedLabel()}"
						maxlength="${maxLabelLength}"
						?theme-angry="${!draft.getValidEditedIdentity()}"
						@input="${inputString(label => { draft.setEditedLabel(label) })}"
						/>
				` : html`
					<div class="text label" theme-input-border>${draft.getEditedLabel()}</div>
				`}

				<slot></slot>
			</div>

			<div class=id>${renderId(draft.identity.id)}</div>
		</section>
	`
})

