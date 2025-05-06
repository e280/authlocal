
import {Auth} from "./federated/auth.js"
import {register_to_dom} from "@benev/slate"

const auth = Auth.install()
auth.then(() => register_to_dom(Auth.components()))

// for all the html-coding real ones out there 🤜🤛
declare global {
	interface Window {
		authlocal: Promise<{Auth: typeof Auth, auth: Auth}>
	}
}
window.authlocal = auth.then(auth => ({Auth, auth}))

