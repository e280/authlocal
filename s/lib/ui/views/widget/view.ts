
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"

import {Card} from "../card/view.js"
import styleCss from "./style.css.js"
import uitheme from "../../uitheme.js"
import {User} from "../../../protocol/user.js"
import lockIcon from "../../icons/tabler/lock.icon.js"
import logoutIcon from "../../icons/tabler/logout.icon.js"
import {AuthLike} from "../../../protocol/types/auth-like.js"
import {addressColor} from "../../../core/ergo/address/color.js"
import {SessionOptions} from "../../../protocol/types/session-options.js"

export const Widget = shadow((auth: AuthLike, options?: Partial<SessionOptions>) => {
	useName("widget")
	useCss(uitheme, styleCss)

	const {user} = auth
	const color = user ? `--color: ${addressColor(user.id)};` : ``

	const renderSignIn = () => html`
		<button
			class=sign-in
			@click="${() => auth.loginViaPopup(options)}">
			${lockIcon}
			<slot>Sign-in with <strong>Authlocal</strong></slot>
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
		<div part=box style="${color}">
			${user
				? renderUser(user)
				: renderSignIn()}
		</div>
	`
})

