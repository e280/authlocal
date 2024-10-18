
import {deep} from "@benev/slate"
import {Keypair} from "./keypair.js"
import {IdentityJson} from "./types.js"
import {versions} from "../../manager/auth/versions.js"
import {randomFullName} from "../../tools/random-names.js"

export class Identity {
	constructor(
		public readonly keypair: Keypair,
		public name: string,
		public created: number,
	) {}

	get thumbprint() {
		return this.keypair.thumbprint
	}

	static async generate() {
		const keypair = await Keypair.generate()
		const name = randomFullName()
		const created = Date.now()
		return new this(keypair, name, created)
	}

	static async fromJson(json: IdentityJson) {
		const keypair = await Keypair.fromJson(json.keypair)
		const {name, created} = json
		return new this(keypair, name, created)
	}

	toJson(): IdentityJson {
		return deep.clone({
			version: versions.identity,
			keypair: this.keypair.toJson(),
			name: this.name,
			created: this.created,
		})
	}
}

