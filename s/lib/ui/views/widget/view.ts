
import {html} from "lit"
import {cssReset, shadow, useCss, useName} from "@e280/sly"

import {Card} from "../card/view.js"
import styleCss from "./style.css.js"
import {User} from "../../../protocol/user.js"
import lockIcon from "../../icons/tabler/lock.icon.js"
import logoutIcon from "../../icons/tabler/logout.icon.js"
import {AuthLike} from "../../../protocol/types/auth-like.js"
import {SessionOptions} from "../../../protocol/types/session-options.js"

export const Widget = shadow((auth: AuthLike, options?: Partial<SessionOptions>) => {
	useName("widget")
	useCss(cssReset, styleCss)
	const {user} = auth

	const renderSignIn = () => html`
		<button
			class=sign-in
			@click="${() => auth.loginViaPopup(options)}">
			<strong>${lockIcon}</strong> Sign-in with <strong>Authlocal</strong>
		</button>
	`

	const renderUser = (user: User) => html`
		${Card(user)}
		<button
			class=sign-out
			@click="${() => auth.logout()}"
			title="Sign-out">
			${logoutIcon}
		</button>
	`

	return html`
		<div part=box>
			${user
				? renderUser(user)
				: renderSignIn()}
		</div>
	`
})

