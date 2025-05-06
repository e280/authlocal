
import {register_to_dom} from "@benev/slate"
import {AuthManager} from "./elements/auth-manager/element.js"
import {AuthPersistence} from "./elements/persistence/element.js"

register_to_dom({AuthManager, AuthPersistence})

