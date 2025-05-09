
import {Thumbprint} from "@e280/stz"
import {html, mixin} from "@benev/slate"

import stylesCss from "./styles.css.js"
import underCss from "../../../common/under.css.js"
import {AuthElement} from "../framework.js"

@mixin.css(underCss, stylesCss)
export class AuthUser extends AuthElement {

	render() {
		const {login} = this.auth

		if (!login)
			return html``

		return html`
			<div part=box ?data-logged-in="${!!login}">
				<span class=label>${login.nametag.label}</span>
				<small>${Thumbprint.hexsigil(login.sessionId)}</small>
			</div>
		`
	}
}

