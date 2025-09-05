
import {dom} from "@e280/sly"
import {authorityElements} from "./elements/elements.js"
import {commonElements} from "../common/elements/elements.js"

dom.register({
	...commonElements,
	...authorityElements,
})

