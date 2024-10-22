
import {Passport} from "../../auth/identity.js"

export namespace Purpose {
	export type Manage = {
		kind: "manage"
	}

	export type Login = {
		kind: "login"
		onLogin: (passport: Passport) => Promise<void>
	}

	////////////////////////////////

	export type Any = Manage | Login
}

