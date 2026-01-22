
import {Science} from "@e280/science"

import acorn from "./core/nomen/acorn.test.js"
import moniker from "./core/nomen/moniker.test.js"
import phonemes from "./core/nomen/phonemes/phonemes.test.js"

await Science.run({
	acorn,
	moniker,
	phonemes,
})

