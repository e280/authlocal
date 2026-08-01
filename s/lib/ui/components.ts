
import {got} from "@e280/stz"
import {shadowElement, useAttrs} from "@e280/sly"

import {Card} from "./views/card/view.js"
import {Poster} from "./views/poster/view.js"

export class AuthPoster extends shadowElement(() => {
	const {uid, alias} = useAttrs({uid: String, alias: String})
	return Poster({id: got(uid, ""), alias})
}) {}

export class AuthCard extends shadowElement(() => {
	const {uid, alias} = useAttrs({uid: String, alias: String})
	return Card({id: got(uid, ""), alias})
}) {}

