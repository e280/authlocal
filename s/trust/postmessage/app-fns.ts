
import {Session} from "../concepts/session/types.js"

//
// this is the postMessage api,
// installed on the consumer app side
//

export type AppFns = {
	v1: {

		/** the authority popup calls this app-side-function when the user has authorized a login */
		login: (session: Session | null) => Promise<void>
	}
}

export const makeAppFns = (
		login: (session: Session | null) => Promise<void>,
	): AppFns => {

	return {
		v1: {login},
	}
}

