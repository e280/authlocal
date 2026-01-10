
import {Situation} from "./situation.js"
import {Identity} from "../../core/identity/types.js"
import {ChannelFlowMandate, LoginFlowMandate} from "../../app/postmessage/types.js"

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

	export type Channel = {
		kind: "channel"
		appOrigin: string
		mandate: ChannelFlowMandate
		availableAliceId: string | null
		deliver: {
			deny: () => Promise<void>
			accept: () => Promise<void>
		}
	}

	export type Any = Management | Login | Channel
}

