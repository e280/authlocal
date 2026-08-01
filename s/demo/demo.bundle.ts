
import {dom} from "@e280/sly"
import {Auth} from "../lib/protocol/auth.js"
import {Widget} from "../lib/ui/views/widget/view.js"

const auth = new Auth({delegatorUrl: "../"})
await auth.remember()

dom.render(dom(".session"), Widget(auth))

