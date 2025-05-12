
import {register} from "@benev/slate"

import {authorityElements} from "./elements/elements.js"
import {commonElements} from "../common/elements/elements.js"

register({
	...commonElements,
	...authorityElements,
})

