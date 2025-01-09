
import {Base64, Text} from "@benev/slate"

import {Passport} from "./passport.js"
import {ensure} from "./utils/ensure.js"
import {crushUsername} from "./utils/crush-username.js"
import {PassportsFileData, PassportData} from "./types.js"

export class PassportsFile {
	static readonly format = "authlocal.org passports"
	static readonly extension = "passport"
	static readonly version = 4

	static #ingestData(raw: any): PassportsFileData {
		let data: PassportsFileData | null = null
		const legacyFormat = "authduo.org passports"

		if (
			!("format" in raw && (raw.format === PassportsFile.format || raw.format === legacyFormat)) ||
			!("version" in raw && typeof raw.version === "number"))
				throw new Error(`invalid format`)

		// v2 and lower is invalid
		if (raw.version <= 2) {
			throw new Error(`invalid version ${raw.version}`)
		}

		// v3 gets migrated to v4
		if (raw.version === 3) {
			// we simply renamed the format, so the migration is just to use the new format name
			raw.format = PassportsFile.format
			raw.version = 4
		}

		// v4 is the current version
		if (raw.version === 4) {
			data = raw
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
		const encoded = Base64.string(Text.bytes(text))
		return `data:application/octet-stream;base64,${encoded}`
	}
}

