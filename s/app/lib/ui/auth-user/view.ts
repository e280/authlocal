
import {html} from "lit"
import {view} from "@e280/sly"
import styleCss from "./style.css.js"
import {Auth} from "../../parts/auth.js"
import {svgLit} from "../../../../tools/svg-lit.js"
import {idHsl} from "../../../../common/utils/id-hue.js"
import userIcon from "../../../../common/ui/icons/tabler/user.icon.js"

export const AuthUser = (auth: Auth) => view(use => () => {
	use.css(auth.theme, styleCss)

	if (!auth.login)
		return html``

	const {id, label} = auth.login.nametag

	return html`
		<div part=shell>
			<div class=icon style="color: ${idHsl(id)};">
				${svgLit(userIcon)}
			</div>
			<div class=box>
				<div part=label>${label}</div>
				<auth-sigil part=id hex="${id}"></auth-sigil>
			</div>
		</div>
	`
})

