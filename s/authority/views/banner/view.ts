
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"

export const Banner = shadow((options: {
		route: string
		gotoList: () => void
		gotoRecovery: () => void
		gotoCreate: () => void
	}) => {

	useName("banner")
	useCss(theme(), styleCss)

	function isActive(s: string) {
		return s === options.route
	}

	return html`
		<h1>authlocal</h1>

		<nav aria-label="primary">
			<button ?data-active="${isActive("list")}" @click="${options.gotoList}">list</button>
			<button ?data-active="${isActive("recovery")}"  @click="${options.gotoRecovery}">recovery</button>
			<button ?data-active="${isActive("create")}" @click="${options.gotoCreate}">create</button>
		</nav>
	`
})

