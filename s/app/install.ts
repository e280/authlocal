
import {dom} from "@e280/sly"
import {Auth} from "./auth.js"
import {AuthOptions} from "./types.js"
import {appElements} from "./elements/elements.js"
import {commonElements} from "../common/elements/elements.js"

export async function install(options?: Partial<AuthOptions>) {
	const auth = new Auth(options)
	await auth.loadLogin()
	dom.register({
		...commonElements,
		...appElements,
	})
	return auth
}

