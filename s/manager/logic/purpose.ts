
import {Passport} from "../../auth/passport.js"

export namespace Purpose {
	export type Manage = {
		kind: "manage"
	}

	export type Login = {
		kind: "login"
		audience: string
		onLogin: (passport: Passport) => Promise<void>
	}

	////////////////////////////////

	export type Any = Manage | Login
}

