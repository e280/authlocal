
import {pub} from "@e280/stz"
import {signal} from "@e280/strata"
import {Bank} from "./parts/bank.js"
import {Identity} from "./types.js"
import {Petition} from "../lib/core/alco/types.js"

export class Context {
	chooseIdentity = pub<[Identity]>()

	$expedition = signal<null | {
		petitionerOrigin: string
		petitions: Petition[]
	}>(null)

	constructor(public bank: Bank) {}
}

