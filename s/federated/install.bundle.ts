
import {register_to_dom} from "@benev/slate"
import {Auth} from "./auth.js"
import {components} from "./views/components.js"

const auth = await Auth.install()

window.addEventListener("storage", auth.loadLogin)

register_to_dom(components)

