
import {FlowMandate, FlowPayload} from "./types.js"

/**
 * this is the postMessage api,
 * installed on the consumer app side
 */
export type AppFns = {
	v1: {
		
		/** authority popup calls this when it's done loading, asking for what auth flow we're doing, and also providing the app with the appOrigin */
		hello(): Promise<FlowMandate>

		/** authority popup calls this when it's done the work for its flow, providing back the flow's payload */
		deliver(payload: FlowPayload | null): Promise<void>
	}
}

export const makeAppFns = (
		flow: FlowMandate,
		deliver: (payload: FlowPayload | null) => Promise<void>,
	): AppFns => {

	return {
		v1: {
			hello: async() => flow,
			deliver,
		},
	}
}

