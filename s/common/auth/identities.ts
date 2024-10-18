
import {Identity} from "./identity.js"
import {IdentitiesJson} from "./types.js"

export class Identities {
	static readonly format = "authduo.org ids"
	static readonly version = 2

	#map = new Map<string, Identity>()

	list() {
		return [...this.#map.values()]
	}

	add(...additions: Identity[]) {
		for (const id of additions)
			this.#map.set(id.thumbprint, id)
		return this
	}

	delete(...deletions: Identity[]) {
		for (const id of deletions)
			this.#map.delete(id.thumbprint)
		return this
	}

	clear() {
		this.#map.clear()
		return this
	}

	overwrite(identities: Identity[]) {
		this.#map.clear()
		this.add(...identities)
		return this
	}

	toJson(): IdentitiesJson {
		return {
			format: "authduop",
			version: Identities.version,
			identities: [...this.#map.values()]
				.map(id => id.toJson()),
		}
	}

	static ingest(raw: any): IdentitiesJson {
		let json: IdentitiesJson | null = null

		if (
			!("format" in raw) ||
			!("version" in raw) ||
			raw.format !== Identities.format)
				throw new Error(`invalid format`)

		switch (raw.version) {
			case 0:
			case 1: throw new Error(`invalid version ${raw.version}`)
			case 2: json = raw
		}

		if (!json)
			throw new Error(`unknown version ${raw.version}`)

		return json
	}

	static async fromJson(raw: any) {
		const json = Identities.ingest(raw)
		const identities = new this()
		identities.add(...await Promise.all(
			json.identities.map(id => Identity.fromJson(id))
		))
		return identities
	}
}

