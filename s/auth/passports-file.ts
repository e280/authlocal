
import {Passport} from "./passport.js"
import {ensure} from "./utils/ensure.js"
import {base64} from "../tools/base64.js"
import {crushUsername} from "./utils/crush-username.js"
import {PassportsFileJson, PassportJson} from "./types.js"

export class PassportsFile {
	static readonly format = "authduo.org passports"
	static readonly extension = "passport"
	static readonly version = 3

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
			passports: ensure.array("array", json.passports.map((p): PassportJson => ({
				name: ensure.string("name", p.name),
				created: ensure.number("created", p.created),
				keypair: {
					thumbprint: ensure.string("thumbprint", p.keypair.thumbprint),
					publicKey: ensure.string("public", p.keypair.publicKey),
					privateKey: ensure.string("private", p.keypair.privateKey),
				},
			})))
		}
	}

	static fromJson(raw: any) {
		const json = PassportsFile.#ingestJson(raw)
		const passports = new this()
		passports.add(...json.passports.map(json => Passport.fromJson(json)))
		return passports
	}

	#map = new Map<string, Passport>()

	list() {
		return [...this.#map.values()]
	}

	add(...additions: Passport[]) {
		for (const passport of additions)
			this.#map.set(passport.thumbprint, passport)
		return this
	}

	delete(...deletions: Passport[]) {
		for (const passport of deletions)
			this.#map.delete(passport.thumbprint)
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
				.map(passport => passport.toJson()),
		}
	}

	filename() {
		const passports = this.list()
		return passports.length === 1
			? `${crushUsername(passports.at(0)!.name)}.${PassportsFile.extension}`
			: `passports.${PassportsFile.extension}`
	}

	href() {
		const text = JSON.stringify(this.toJson(), undefined, "\t")
		const encoded = base64.from.text(text)
		return `data:application/octet-stream;base64,${encoded}`
	}
}

