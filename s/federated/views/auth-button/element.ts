
import {ShadowElement, TemplateResult, attributes, html, mixin} from "@benev/slate"

import {Auth} from "../../auth.js"
import stylesCss from "./styles.css.js"

@mixin.css(stylesCss)
@mixin.reactive()
export class AuthButton extends ShadowElement {
	auth = Auth.get()

	attrs = attributes(this, {
		"src": String,
		"theme": String,
	})

	render(): TemplateResult {
		const {auth} = this
		const {login} = auth
		return login
			? html`
				<button
					class=logout
					part=button
					@click="${() => auth.logout()}">
						<slot name=logout>Logout</slot>
				</button>`

			: html`
				<button
					class=login
					part=button
					@click="${() => auth.popup(this.attrs.src)}">
						<slot>Login</slot>
				</button>`
	}
}

