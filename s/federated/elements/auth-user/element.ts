
import {html, mixin, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import underCss from "../../../common/under.css.js"
import userIcon from "../../../common/icons/tabler/user.icon.js"

import {AuthElement} from "../framework.js"
import {idHsl} from "../../../common/utils/id-hue.js"

@mixin.css(underCss, stylesCss)
export class AuthUser extends AuthElement {

	render() {
		const {login} = this.auth

		if (!login)
			return html``

		const {id, label} = login.nametag

		return html`
			<div part=shell>
				<div class=icon style="color: ${idHsl(id)};">
					${svgSlate(userIcon)}
				</div>
				<div class=box>
					<div part=label>${label}</div>
					<auth-sigil part=id hex="${id}"></auth-sigil>
				</div>
			</div>
		`
	}
}

