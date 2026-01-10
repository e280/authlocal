
import {html} from "lit"
import {view} from "@e280/sly"
import styleCss from "./style.css.js"
import {Auth} from "../../parts/auth.js"
import {idHsl} from "../../tools/id-hue.js"
import {svgLit} from "../../tools/svg-lit.js"
import userIcon from "../../icons/tabler/user.icon.js"

export const AuthUser = (auth: Auth) => view(use => () => {
	use.name("auth-user")
	use.css(auth.theme, styleCss)
	use.states().assign(auth.login ? "authenticated" : "unauthenticated")

	if (!auth.login)
		return null

	const {id, label} = auth.login.nametag
	const idcolor = idHsl(id)

	return html`
		<div part=shell style="--idcolor: ${idcolor};">
			<div class=icon>
				${svgLit(userIcon)}
			</div>
			<div class=box>
				<div part=label>${label}</div>
				<auth-sigil part=id hex="${id}"></auth-sigil>
			</div>
		</div>
	`
})

