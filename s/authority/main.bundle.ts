
import {dom} from "@e280/sly"
import {authorityElements} from "./elements/elements.js"
import {commonElements} from "../common/ui/views/views.js"

dom.register({
	...commonElements,
	...authorityElements,
})

