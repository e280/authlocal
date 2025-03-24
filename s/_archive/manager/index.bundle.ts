
import {register_to_dom} from "@benev/slate"
import {AuthManager} from "./views/auth-manager/element.js"
import {AuthSafeStorage} from "./views/safe-storage/element.js"

register_to_dom({AuthManager, AuthSafeStorage})

console.log("🗽 Authlocal")

