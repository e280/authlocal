
import {html, shadowComponent, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../theme.css.js"
import shieldOffIcon from "../../../common/icons/tabler/shield-off.icon.js"
import shieldCheckFilledIcon from "../../../common/icons/tabler/shield-check-filled.icon.js"

import {manager} from "../../context.js"

export const AuthPersistence = shadowComponent(use => {
	use.styles(themeCss, stylesCss)
	const {storagePersistence} = manager

	return storagePersistence.persisted.value ? html`
		<div class=persistence
			x-persisted
			title="Your browser granted persistent storage">
				${svgSlate(shieldCheckFilledIcon)}
				<span>Persistence on.</span>
		</div>

	` : html`
		<button
			class=persistence
			@click="${() => storagePersistence.request()}"
			title="Your browser has NOT granted persistent storage">
				${svgSlate(shieldOffIcon)}
				<span>Persistence off.</span>
		</button>
	`
})

