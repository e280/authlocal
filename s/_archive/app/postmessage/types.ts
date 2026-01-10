
import {Session} from "../../core/session/types.js"

export type LoginFlowMandate = {flow: "login", context: string}
export type ChannelFlowMandate = {flow: "channel", aliceId: string, bobId: string, salt: string}
export type FlowMandate = LoginFlowMandate | ChannelFlowMandate

export type LoginFlowPayload = {flow: "login", session: Session}
export type ChannelFlowPayload = {flow: "channel", secret: string}
export type FlowPayload = LoginFlowPayload | ChannelFlowPayload

