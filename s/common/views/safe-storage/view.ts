
import {html, shadowView, svgSlate} from "@benev/slate"

import {manager} from "../../../manager/context.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../theme.css.js"

import shieldOffIcon from "../../icons/tabler/shield-off.icon.js"
import shieldCheckFilledIcon from "../../icons/tabler/shield-check-filled.icon.js"

export const SafeStorageView = shadowView(use => () => {
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

