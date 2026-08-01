
import {dom} from "@e280/sly"
import {Auth} from "../lib/protocol/auth.js"
import {Widget} from "../lib/ui/views/widget/view.js"
import { MockAuth } from "../lib/index.js"

// const auth = new Auth({delegatorUrl: "../"})
const auth = new MockAuth()
await auth.remember()

dom.render(dom(".session"), Widget(auth))

