
import {Thumbprint} from "@e280/stz"
import {ShadowElement, html, mixin} from "@benev/slate"

import stylesCss from "./styles.css.js"
import underCss from "../../../common/under.css.js"

import {Auth} from "../../auth.js"

@mixin.reactive()
@mixin.css(underCss, stylesCss)
export class AuthUser extends ShadowElement {
	auth = Auth.get()

	render() {
		const {auth} = this
		const {login} = auth

		return login ? html`
			<div part=box ?data-logged-in="${!!login}">
				<span class=label>${login.nametag.label}</span>
				<small>${Thumbprint.hexsigil(login.sessionId)}</small>
			</div>
		` : null
	}
}

