
import {html} from "lit"
import {useCss, useName, shadowDuplex, useAttrs} from "@e280/sly"

import {Card} from "../card/view.js"
import styleCss from "./style.css.js"
import uitheme from "../../uitheme.js"
import {User} from "../../../protocol/user.js"
import xIcon from "../../icons/tabler/x.icon.js"
import lockIcon from "../../icons/tabler/lock.icon.js"
import {AuthLike} from "../../../protocol/types/auth-like.js"
import {addressColor} from "../../../core/ergo/address/color.js"
import {SessionOptions} from "../../../protocol/types/session-options.js"

export const [Widget, makeWidgetElement] = shadowDuplex((
		auth: AuthLike,
		options?: Partial<SessionOptions>,
	) => {

	useName("widget")
	useCss(uitheme, styleCss)
	const attrs = useAttrs({"no-alias": Boolean})

	const {user} = auth
	const color = user
		? `--color: ${addressColor(user.id)};`
		: ``

	const renderSignIn = () => html`
		<button
			class="sign-in"
			@click="${() => auth.loginViaPopup(options)}">
			${lockIcon}
			<slot></slot>
		</button>
	`

	const renderUser = (user: User) => Card.with({
		props: [
			attrs["no-alias"]
				? {id: user.id}
				: user,
		],
		children: html`
			<button
				class="sign-out"
				title="sign out"
				@click="${() => auth.logout()}">
				${xIcon}
			</button>
		`,
	})

	return html`
		<div part=box style="${color}">
			${user
				? renderUser(user)
				: renderSignIn()}
		</div>
	`
})

/** @deprecated renamed to `makeWidgetElement`. */
export const makeAuthWidget = makeWidgetElement

