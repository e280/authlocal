
import {dom} from "@e280/sly"
import {Auth} from "../lib/protocol/auth.js"
import {makeAuthWidget} from "../lib/ui/views/widget/view.js"

const auth = new Auth({delegatorUrl: "../"})
await auth.remember()

dom.register({AuthWidget: makeAuthWidget(auth)})

