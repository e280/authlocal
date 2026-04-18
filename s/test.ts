
import {Science} from "@e280/science"

import alco from "./lib/alco/test.js"
import address from "./lib/ergo/address/test.js"
import cryp from "./lib/cryp/test.js"
import seed from "./lib/ergo/seed/test.js"
import phonemes from "./lib/ergo/phonemes/test.js"
import micro from "./lib/micro/test.js"

await Science.run({
	alco,
	address,
	cryp,
	seed,
	phonemes,
	micro,
})

