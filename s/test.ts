
import {Science} from "@e280/science"

import alco from "./core/alco/test.js"
import cryp from "./core/cryp/test.js"
import seed from "./core/ergo/seed/test.js"
import nomen from "./core/ergo/nomen/test.js"
import phonemes from "./core/ergo/phonemes/test.js"

await Science.run({
	alco,
	cryp,
	seed,
	nomen,
	phonemes,
})

