
import {Passport} from "./passport.js"
import {ensure} from "./utils/ensure.js"
import {base64} from "../tools/base64.js"
import {crushUsername} from "./utils/crush-username.js"
import {PassportsFileJson, PassportJson} from "./types.js"

export class PassportsFile {
	static readonly format = "authduo.org passports"
	static readonly version = 3

	#map = new Map<string, Passport>()

	list() {
		return [...this.#map.values()]
	}

	add(...additions: Passport[]) {
		for (const id of additions)
			this.#map.set(id.thumbprint, id)
		return this
	}

	delete(...deletions: Passport[]) {
		for (const id of deletions)
			this.#map.delete(id.thumbprint)
		return this
	}

	deleteAll() {
		this.#map.clear()
		return this
	}

	toJson(): PassportsFileJson {
		return {
			format: PassportsFile.format,
			version: PassportsFile.version,
			passports: [...this.#map.values()]
				.map(id => id.toJson()),
		}
	}

	static #ingestJson(raw: any): PassportsFileJson {
		let json: PassportsFileJson | null = null

		if (
			!("format" in raw) ||
			!("version" in raw) ||
			raw.format !== PassportsFile.format)
				throw new Error(`invalid format`)

		switch (raw.version) {
			case 0:
			case 1:
			case 2: throw new Error(`invalid version ${raw.version}`)
			case 3: json = raw
		}

		if (!json)
			throw new Error(`unknown version ${raw.version}`)

		return {
			format: ensure.string("format", json.format),
			version: ensure.number("version", json.version),
			passports: ensure.array("array", json.passports.map((id): PassportJson => ({
				name: ensure.string("name", id.name),
				created: ensure.number("created", id.created),
				keypair: {
					thumbprint: ensure.string("thumbprint", id.keypair.thumbprint),
					publicKey: ensure.string("public", id.keypair.publicKey),
					privateKey: ensure.string("private", id.keypair.privateKey),
				},
			})))
		}
	}

	static fromJson(raw: any) {
		const json = PassportsFile.#ingestJson(raw)
		const passports = new this()
		passports.add(...json.passports.map(idjson => Passport.fromJson(idjson)))
		return passports
	}

	filename() {
		const passports = this.list()
		return passports.length === 1
			? `${crushUsername(passports.at(0)!.name)}.passport`
			: `passports.passport`
	}

	href() {
		const text = JSON.stringify(this.toJson(), undefined, "\t")
		const encoded = base64.from.text(text)
		return `data:application/json;base64,${encoded}`
	}
}

