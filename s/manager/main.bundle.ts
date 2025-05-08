
import {register} from "@benev/slate"

import {managerElements} from "./elements/elements.js"
import {commonElements} from "../common/elements/elements.js"

register({
	...commonElements,
	...managerElements,
})

