
import {register} from "@benev/slate"

import {Auth} from "./auth.js"
import {AuthOptions} from "./types.js"
import {consumerElements} from "./elements/elements.js"
import {commonElements} from "../common/elements/elements.js"

export async function prepareElements(auth: Auth) {
	return {...commonElements, ...consumerElements(auth)}
}

export async function install(options?: Partial<AuthOptions>) {
	const auth = new Auth(options)
	const elements = await prepareElements(auth)
	await auth.loadLogin()
	register(elements)
	return auth
}

