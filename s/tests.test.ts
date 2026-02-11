
import {Science} from "@e280/science"

import alco from "./core/alco/alco.test.js"
import cryp from "./core/cryp/cryp.test.js"
import acorn from "./core/nomen/acorn/acorn.test.js"
import moniker from "./core/nomen/moniker/moniker.test.js"
import phonemes from "./core/nomen/phonemes/phonemes.test.js"

await Science.run({
	alco,
	cryp,
	acorn,
	moniker,
	phonemes,
})

