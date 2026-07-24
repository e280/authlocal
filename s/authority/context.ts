
import {pub} from "@e280/stz"
import {signal} from "@e280/strata"
import {Bank} from "./sys/bank.js"
import {Identity} from "./types.js"
import {Petition} from "../lib/alco/types.js"

export class Context {
	chooseIdentity = pub<[Identity]>()

	$expedition = signal<null | {
		appOrigin: string
		petitions: Petition[]
	}>(null)

	constructor(public bank: Bank) {}
}

