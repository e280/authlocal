
import {Identity} from "../../core/flow/exports.js"

/** the reason the management app was opened */
export namespace Purpose {

	/** the app was opened for the user to manage their identities */
	export type Manage = {
		kind: "manage"
	}

	/** the app was opened for the user to select a identity to login with */
	export type Login = {
		kind: "login"
		appOrigin: string
		onDeny: () => Promise<void>
		onIdentity: (identity: Identity) => Promise<void>
	}

	////////////////////////////////

	export type Any = Manage | Login
}

