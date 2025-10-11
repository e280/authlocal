
import {Session} from "../../core/session/types.js"

export type LoginFlowMandate = {flow: "login"}
export type CommsFlowMandate = {flow: "comms", aliceId: string, bobId: string, salt: string}
export type FlowMandate = LoginFlowMandate | CommsFlowMandate

export type LoginFlowPayload = {flow: "login", session: Session}
export type CommsFlowPayload = {flow: "comms", secret: string}
export type FlowPayload = LoginFlowPayload | CommsFlowPayload

