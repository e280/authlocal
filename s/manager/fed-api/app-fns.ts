
import {Session} from "../../core/session.js"

export type AppFns = {
	v3: {
		login: (session: Session | null) => Promise<void>
	}
}

export const makeAppFns = (
		login: (session: Session | null) => Promise<void>,
	): AppFns => {

	return {
		v3: {login},
	}
}

