
import {Identity} from "./identity.js"
import {ensure} from "./utils/ensure.js"
import {base64} from "../../tools/base64.js"
import {crushUsername} from "./utils/crush-username.js"
import {IdentitiesJson, IdentityJson} from "./types.js"

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

	static ingestJson(raw: any): IdentitiesJson {
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

		return {
			format: ensure.string("format", json.format),
			version: ensure.number("version", json.version),
			identities: ensure.array("array", json.identities.map((id): IdentityJson => ({
				name: ensure.string("name", id.name),
				created: ensure.number("created", id.created),
				keypair: {
					public: ensure.string("public", id.keypair.public),
					private: ensure.string("private", id.keypair.private),
				},
			})))
		}
	}

	static async fromJson(raw: any) {
		const json = Identities.ingestJson(raw)
		const identities = new this()
		identities.add(...await Promise.all(
			json.identities.map(id => Identity.fromJson(id))
		))
		return identities
	}

	filename() {
		const ids = this.list()
		return ids.length === 1
			? `${crushUsername(ids.at(0)!.name)}.id`
			: `identities.id`
	}

	href() {
		const text = JSON.stringify(this.toJson(), undefined, "\t")
		const encoded = base64.from.text(text)
		return `data:application/json;base64,${encoded}`
	}
}

