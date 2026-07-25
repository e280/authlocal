
import {Kv} from "@e280/kv"
import {signal} from "@e280/strata"
import {Petition} from "../core/index.js"

export type AuthSession = {
}

export class Auth {
	#session = signal<null | AuthSession>(null)

	constructor(kv: Kv, rofl: string) {}

	async login() {}
}

export async function requestDelegates(options: {
		petitions: Petition[]
	}) {

}

