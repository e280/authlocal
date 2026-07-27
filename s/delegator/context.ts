
import {signal} from "@e280/strata"
import {Bank} from "./parts/bank.js"
import {Identity} from "./types.js"
import {Petition} from "../lib/core/alco/types.js"

export class Context {
	$expedition = signal<null | {
		appOrigin: string
		petitions: Petition[]
		chooseIdentity: (identity: Identity) => void
	}>(null)

	constructor(public bank: Bank) {}
}

