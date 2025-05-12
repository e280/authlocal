
import {sub} from "@e280/stz"
import {TemplateResult, attributes, html, mixin} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {AuthElement} from "../framework.js"
import {Login} from "../../../core/flow/exports.js"

@mixin.css(stylesCss)
export class AuthButton extends AuthElement {
	attrs = attributes(this, {
		"src": String,
	})

	on = sub<[Login | null]>()

	#clickLogout = async() => this.on.pub(
		await this.auth.logout()
	)

	#clickLogin = async() => this.on.pub(
		await this.auth.popup(this.attrs.src)
	)

	render(): TemplateResult {
		const {auth} = this
		const {login} = auth
		return login

			? html`
				<button
					class=logout
					theme-button=logout
					part="button button-logout"
					@click="${this.#clickLogout}">
						<slot name=logout>Logout</slot>
				</button>
			`

			: html`
				<button
					class=login
					theme-button=login
					part="button button-login"
					@click="${this.#clickLogin}">
						<slot>Login</slot>
				</button>
			`
	}
}

