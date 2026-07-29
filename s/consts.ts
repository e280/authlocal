
import {deep, time} from "@e280/stz"

export const consts = deep.freeze({
	namespace: "authlocal4",
	delegatorUrl: "https://authlocal.org/",
	standardLifespan: time.days(30),
	standardCryptScope: "",
	purposes: {auth: "auth", crypt: "crypt"},
	maxAliasLength: 32,
	enableDelegationLog: false,
})

