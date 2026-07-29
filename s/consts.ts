
import {deep, time} from "@e280/stz"

export const consts = deep.freeze({
	namespace: "authlocal4",
	delegatorUrl: "https://authlocal.org/",
	delegateProtocol: "authlocal/delegate/v1",
	purposes: {auth: "auth", crypt: "crypt"},
	standardLifespan: time.days(30),
	standardCryptScope: "",
	maxAliasLength: 32,
	enableDelegationLog: false,
})

