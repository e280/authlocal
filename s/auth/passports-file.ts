
import {Passport} from "./passport.js"
import {ensure} from "./utils/ensure.js"
import {base64} from "../tools/base64.js"
import {crushUsername} from "./utils/crush-username.js"
import {PassportsFileData, PassportData} from "./types.js"

export class PassportsFile {
	static readonly format = "authduo.org passports"
	static readonly extension = "passport"
	static readonly version = 3

	static #ingestData(raw: any): PassportsFileData {
		let data: PassportsFileData | null = null

		if (
			!("format" in raw) ||
			!("version" in raw) ||
			raw.format !== PassportsFile.format)
				throw new Error(`invalid format`)

		switch (raw.version) {
			case 0:
			case 1:
			case 2: throw new Error(`invalid version ${raw.version}`)
			case 3: data = raw
		}

		if (!data)
			throw new Error(`unknown version ${raw.version}`)

		return {
			format: ensure.string("format", data.format),
			version: ensure.number("version", data.version),
			passports: ensure.array("array", data.passports.map((p): PassportData => ({
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

	static fromData(raw: any) {
		const data = PassportsFile.#ingestData(raw)
		const passports = new this()
		passports.add(...data.passports.map(d => Passport.fromData(d)))
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

	toData(): PassportsFileData {
		return {
			format: PassportsFile.format,
			version: PassportsFile.version,
			passports: [...this.#map.values()]
				.map(passport => passport.toData()),
		}
	}

	filename() {
		const passports = this.list()
		return passports.length === 1
			? `${crushUsername(passports.at(0)!.name)}.${PassportsFile.extension}`
			: `passports.${PassportsFile.extension}`
	}

	href() {
		const text = JSON.stringify(this.toData(), undefined, "\t")
		const encoded = base64.from.text(text)
		return `data:application/octet-stream;base64,${encoded}`
	}
}

