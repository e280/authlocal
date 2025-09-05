
import {ob} from "@e280/stz"
import {Auth} from "../auth.js"
import {AuthUser} from "./auth-user/element.js"
import {AuthButton} from "./auth-button/element.js"

export const appElements = (auth: Auth) => ob({
	AuthUser,
	AuthButton,
}).map(provide => provide(auth))

