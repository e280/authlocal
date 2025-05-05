
import {Auth} from "./auth.js"

const auth = await Auth.install()
window.addEventListener("storage", auth.loadLogin)

console.log("Federated Authlocal")

// import {register_to_dom} from "@benev/slate"
// import {components} from "./federated/views/components.js"
//
// register_to_dom(components)

