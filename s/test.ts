
import {Science} from "@e280/science"

import alco from "./lib/core/alco/test.js"
import address from "./lib/core/ergo/address/test.js"
import cryp from "./lib/core/cryp/test.js"
import seed from "./lib/core/ergo/seed/test.js"
import phonemes from "./lib/core/ergo/phonemes/test.js"

await Science.run({
	alco,
	address,
	cryp,
	seed,
	phonemes,
})

