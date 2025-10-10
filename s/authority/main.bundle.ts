
import {dom} from "@e280/sly"
import {authorityElements} from "./elements/elements.js"
import {commonElements} from "../app/common/views.js"

dom.register({
	...commonElements,
	...authorityElements,
})

