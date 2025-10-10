
import {view} from "@e280/sly"
import {html} from "lit"

import stylesCss from "./styles.css.js"
import themeCss from "../../theme.css.js"
import shieldOffIcon from "../../../app/icons/tabler/shield-off.icon.js"
import shieldCheckFilledIcon from "../../../app/icons/tabler/shield-check-filled.icon.js"

import {manager} from "../../context.js"
import {svgLit} from "../../../app/utils/svg-lit.js"

export const AuthPersistence = view.component(use => {
	use.styles(themeCss, stylesCss)
	const {storagePersistence} = manager

	return storagePersistence.persisted.value ? html`
		<div class=persistence
			x-persisted
			title="Your browser granted persistent storage">
				${svgLit(shieldCheckFilledIcon)}
				<span>Persistence on.</span>
		</div>

	` : html`
		<button
			class=persistence
			@click="${() => storagePersistence.request()}"
			title="Your browser has NOT granted persistent storage">
				${svgLit(shieldOffIcon)}
				<span>Persistence off.</span>
		</button>
	`
})

