
import {Situation} from "./situation.js"
import {Identity} from "../../core/identity/types.js"
import {CommsFlowMandate, LoginFlowMandate} from "../../app/postmessage/types.js"

export namespace Mission {
	export type Management = {
		kind: "management"
		situation: Situation.Any
	}

	export type Login = {
		kind: "login"
		appOrigin: string
		mandate: LoginFlowMandate
		situation: Situation.Any
		deliver: {
			deny: () => Promise<void>
			identity: (identity: Identity) => Promise<void>
		}
	}

	export type Comms = {
		kind: "comms"
		appOrigin: string
		mandate: CommsFlowMandate
		availableAliceId: string | null
		deliver: {
			deny: () => Promise<void>
			accept: () => Promise<void>
		}
	}

	export type Any = Management | Login | Comms
}

