
import {Identity} from "../../core/identity/types.js"

/** the reason the management app was opened */
export namespace Purpose {

	/** authority-app was opened for the user to manage their identities */
	export type Manage = {
		kind: "manage"
	}

	/** authority-app was opened for the user to select a identity to login with */
	export type Login = {
		kind: "login"
		appOrigin: string
		onDeny: () => Promise<void>
		onIdentity: (identity: Identity) => Promise<void>
	}

	/** authority-app was opened for the user to select a identity to login with */
	export type Channel = {
		kind: "channel"
		appOrigin: string
		aliceId: string | null // our own local id
		bobId: string // remote id of the other party
		onDeny: () => Promise<void>
		onAccept: () => Promise<void>
	}

	////////////////////////////////

	export type Any = Manage | Login | Channel
}

