
import {Pipe} from "@e280/stz"
import {apply} from "@benev/slate"

import {Auth} from "../auth.js"
import {provideAuth} from "./framework.js"
import {AuthUser} from "./auth-user/element.js"
import {AuthButton} from "./auth-button/element.js"

export const federatedElements = (auth: Auth) => Pipe
	.with({AuthButton, AuthUser})
	.to(provideAuth(auth))
	.to(apply.reactive())
	.done()

