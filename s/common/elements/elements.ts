
import {pipe} from "@e280/stz"
import {apply} from "@benev/slate"

import {AuthSigil} from "./auth-sigil/element.js"

export const commonElements = pipe({AuthSigil})
	.to(apply.reactive())
	.done()

