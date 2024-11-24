
import {manager} from "../../../manager/context.js"
import {html, shadowComponent, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../common/theme.css.js"

import shieldOffIcon from "../../../common/icons/tabler/shield-off.icon.js"
import shieldCheckFilledIcon from "../../../common/icons/tabler/shield-check-filled.icon.js"

export const AuthSafeStorage = shadowComponent(use => {
	use.styles(themeCss, stylesCss)
	const {storagePersistence} = manager

	return storagePersistence.persisted.value ? html`
		<div class=persistence x-persisted title="Your browser granted persistent storage">
			${svgSlate(shieldCheckFilledIcon)}
			<span>Safe storage</span>
		</div>
	` : html`
		<button class=persistence @click="${() => storagePersistence.request()}" title="Your browser has NOT granted persistent storage">
			${svgSlate(shieldOffIcon)}
			<span>Unsafe storage</span>
		</button>
	`
})

