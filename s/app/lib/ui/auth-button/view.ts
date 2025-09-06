
import {html} from "lit"
import {view} from "@e280/sly"
import {Auth} from "../../parts/auth.js"
import stylesCss from "./styles.css.js"

export const AuthButton = (auth: Auth) => view(use => () => {
	use.css(stylesCss)
	const attrs = use.attrs({src: String})

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

