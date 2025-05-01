
import {Passport} from "../../core/passport.js"

/** the reason the management app was opened */
export namespace Purpose {

	/** the app was opened for the user to manage their passports */
	export type Manage = {
		kind: "manage"
	}

	/** the app was opened for the user to select a passport to login with */
	export type Login = {
		kind: "login"
		audience: string
		hostname: string
		onPassport: (passport: Passport) => Promise<void>
	}

	////////////////////////////////

	export type Any = Manage | Login
}

