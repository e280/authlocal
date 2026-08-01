
import {html} from "lit"
import {got} from "@e280/stz"
import {shadowElement, useAttrs} from "@e280/sly"

import {Card} from "./views/card/view.js"
import {Poster} from "./views/poster/view.js"
import {Widget} from "./views/widget/view.js"
import {AuthLike} from "../protocol/types/auth-like.js"
import {SessionOptions} from "../protocol/types/session-options.js"

export class AuthPoster extends shadowElement(() => {
	const {uid, alias} = useAttrs({uid: String, alias: String})
	return Poster({id: got(uid, ""), alias})
}) {}

export class AuthCard extends shadowElement(() => {
	const {uid, alias} = useAttrs({uid: String, alias: String})
	return Card({id: got(uid, ""), alias})
}) {}

export function makeAuthWidget(auth: AuthLike, options?: Partial<SessionOptions>) {
	return class AuthWidget extends shadowElement(() => Widget.with({
		props: [auth, options],
		children: html`<slot></slot>`,
	})) {}
}

