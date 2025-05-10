
import {Pipe} from "@e280/stz"
import {apply} from "@benev/slate"

import {AuthSigil} from "./auth-sigil/element.js"

export const commonElements = Pipe
	.with({AuthSigil})
	.to(apply.reactive())
	.done()

