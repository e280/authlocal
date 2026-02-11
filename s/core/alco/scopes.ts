
const prefix = "authlocal:1"

export const scopes = Object.freeze({
	id: `${prefix}:id`,
	viceroy: `${prefix}:viceroy`,
	login: `${prefix}:login`,
} as const)

