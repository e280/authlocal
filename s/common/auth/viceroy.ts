
import {Keypair} from "./keypair.js"

export class Viceroy {
	static async generate() {
		const keypair = await Keypair.generate()
		return () => {}
	}

	constructor() {}
}

