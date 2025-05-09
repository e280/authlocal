
import {Pipe} from "@e280/stz"
import {apply} from "@benev/slate"

import {AuthId} from "./auth-id/element.js"

export const commonElements = Pipe
	.with({AuthId})
	.to(apply.reactive())
	.done()

