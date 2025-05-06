
import {ShadowElement, attributes, html, mixin} from "@benev/slate"

import {Auth} from "../../auth.js"
import stylesCss from "./styles.css.js"

@mixin.css(stylesCss)
@mixin.reactive()
export class AuthButton extends ShadowElement {
	auth = Auth.get()

	#attrs = attributes(this, {"src": String})
	get src() { return this.#attrs.src }
	set src(src: string | undefined) { this.#attrs.src = src }

	render() {
		const {auth} = this
		const {login} = auth
		return login
			? html`
				<button
					class=logout
					part=button
					@click="${() => auth.saveLogin(null)}">
						Logout
				</button>`

			: html`
				<button
					class=login
					part=button
					@click="${() => auth.popup(this.#attrs.src)}">
						Login
				</button>`
	}
}

