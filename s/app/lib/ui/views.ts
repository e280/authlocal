
import {ob} from "@e280/stz"
import {Auth} from "../parts/auth.js"
import {AuthUser} from "./auth-user/view.js"
import {AuthButton} from "./auth-button/view.js"

export function prepareViews(auth: Auth) {
	const views = ob({
		AuthUser,
		AuthButton,
	}).map(provide => provide(auth))

	const elements = ob(views).map(v => v.component())

	return {views, elements}
}

