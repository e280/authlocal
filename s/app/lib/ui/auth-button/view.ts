
import {html} from "lit"
import {view} from "@e280/sly"
import styleCss from "./style.css.js"
import {Auth} from "../../parts/auth.js"

export const AuthButton = (auth: Auth) => view(use => () => {
	use.name("auth-button")
	use.css(auth.theme, styleCss)
	const attrs = use.attrs.spec({src: String})
	use.states().assign(auth.login ? "authenticated" : "unauthenticated")

	async function clickLogout() {
		await auth.logout()
	}

	async function clickLogin() {
		await auth.popup(attrs.src)
	}

	return (auth.login

		? html`
			<button
				class=logout
				theme-button=logout
				part="button button-logout"
				@click="${clickLogout}">
					<slot name=logout>Logout</slot>
			</button>
		`

		: html`
			<button
				class=login
				theme-button=login
				part="button button-login"
				@click="${clickLogin}">
					<slot>Login</slot>
			</button>
		`
	)
})

