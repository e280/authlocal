
import {ShadowElement, attributes, html, mixin} from "@benev/slate"

import {Auth} from "../../auth.js"
import stylesCss from "./styles.css.js"

@mixin.css(stylesCss)
@mixin.reactive()
export class AuthButton extends ShadowElement {
	auth = Auth.get()

	#attrs = attributes(this, {
		"src": String,
	})

	get src() {
		return this.#attrs.src ?? Auth.defaultUrl
	} set src(src: string) {
		this.#attrs.src = src
	}

	render() {
		const {auth} = this
		const {login} = auth

		if (login) {
			const logout = () => { auth.login = null }
			return html`<button part=button class=logout @click="${logout}">Logout</button>`
		}
		else {
			const popup = () => auth.popup(this.#attrs.src)
			return html`<button part=button class=login @click="${popup}">Login</button>`
		}
	}
}

