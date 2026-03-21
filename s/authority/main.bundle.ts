
import {dom, light} from "@e280/sly"
import {CreatePage} from "./pages/create/view.js"

dom.render(dom("main"), light(() => {
	return CreatePage(draft => console.log(draft))
})())

console.log("authlocal")

