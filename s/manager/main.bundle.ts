
import {register} from "@benev/slate"

import basicCss from "../themes/basic.css.js"

import {common} from "../common/common.js"
import {managerElements} from "./elements/elements.js"
import {commonElements} from "../common/elements/elements.js"

common.theme = basicCss

register({
	...commonElements,
	...managerElements,
})

