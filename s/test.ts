
import {Science} from "@e280/science"

import alco from "./core/alco/test.js"
import cryp from "./core/cryp/test.js"
import acorn from "./core/nomen/acorn/test.js"
import moniker from "./core/nomen/moniker/test.js"
import phonemes from "./core/nomen/phonemes/test.js"

await Science.run({
	alco,
	cryp,
	acorn,
	moniker,
	phonemes,
})

