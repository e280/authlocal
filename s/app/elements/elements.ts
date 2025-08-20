
import {pipe} from "@e280/stz"
import {apply} from "@benev/slate"

import {Auth} from "../auth.js"
import {provideAuth} from "./framework.js"
import {AuthUser} from "./auth-user/element.js"
import {AuthButton} from "./auth-button/element.js"

export const appElements = (auth: Auth) => pipe({AuthButton, AuthUser})
	.to(provideAuth(auth))
	.to(apply.reactive())
	.done()

