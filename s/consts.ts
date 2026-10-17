
import {days, deepFreeze} from "@e280/stz"

export const consts = deepFreeze({
	namespace: "authlocal4",
	delegatorUrl: "https://authlocal.org/",
	delegateProtocol: "authlocal/delegate/v1",
	purposes: {auth: "auth", crypt: "crypt"},
	standardLifespan: days(30),
	standardCryptScope: "",
	maxAliasLength: 32,
	enableDelegationLog: false,
	broadcastReloadDelay: 100,
	smallSeeds: true,
})

