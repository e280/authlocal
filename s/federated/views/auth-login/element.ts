
import {ShadowElement, attributes, html, mixin} from "@benev/slate"

import {Auth} from "../../auth.js"
import {auth} from "../../context.js"
import stylesCss from "./styles.css.js"

	@mixin.css(stylesCss)
	@mixin.reactive()
export class AuthLogin extends ShadowElement {
	auth = auth

	#attrs = attributes(this, {
		"src": String,
		"no-logout": Boolean,
	})

	get src() {
		return this.#attrs.src ?? Auth.url
	} set src(src: string) {
		this.#attrs.src = src
	}

	get noLogout() {
		return this.#attrs["no-logout"] ?? false
	} set noLogout(value: boolean) {
		this.#attrs["no-logout"] = value
	}

	render() {
		const {auth} = this
		const {login} = auth
		const popup = () => auth.popup(this.#attrs.src)
		const logout = () => { auth.login = null }

		return html`
			<div class=box ?data-logged-in="${!!login}">

				${login ? html`
					<div class=card>
						<span class=name>${login.name}</span>
						<small class=thumbprint>${login.thumbprint.slice(0, 8)}</small>
					</div>
				` : null}

				${login
					? (this.noLogout ? null : html`<button class=logout @click="${logout}">Logout</button>`)
					: html`<button class=login @click="${popup}">Login</button>`}
			</div>
		`
	}
}

