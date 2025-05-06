
import {ShadowElement, html, mixin} from "@benev/slate"

import stylesCss from "./styles.css.js"

import {Auth} from "../../auth.js"
import {idPreview} from "../../../tools/id-preview.js"

@mixin.css(stylesCss)
@mixin.reactive()
export class AuthUser extends ShadowElement {
	auth = Auth.get()

	render() {
		const {auth} = this
		const {login} = auth

		return login ? html`
			<div part=box ?data-logged-in="${!!login}">
				<span class=label>${login.nametag.label}</span>
				<small>${idPreview(login.sessionId)}</small>
			</div>
		` : html``
	}
}

