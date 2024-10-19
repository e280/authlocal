
import {Identity} from "../../common/auth/identity.js"

export namespace Purpose {
	export type Manage = {
		kind: "manage"
	}

	export type Login = {
		kind: "login"
		onLogin: (identity: Identity) => void
	}

	////////////////////////////////

	export type Any = Manage | Login
}

