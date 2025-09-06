
import {dom} from "@e280/sly"
import {Auth} from "./auth.js"
import {AuthOptions} from "./types.js"
import {prepareViews} from "../ui/views.js"
import {commonElements} from "../../../common/ui/views/views.js"

export async function install(options?: Partial<AuthOptions>) {
	const auth = new Auth(options)
	await auth.loadLogin()

	const {views, elements} = prepareViews(auth)
	dom.register({
		...commonElements,
		...elements,
	})

	return {auth, views}
}

