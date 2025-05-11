
import {Session} from "../../core/session.js"

export type AppFns = {
	v1: {
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

