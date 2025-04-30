
import {Base64, Txt} from "@e280/stz"
import {ensure} from "./utils/ensure.js"
import {deriveId} from "../../../crypto/core.js"
import {validLabel} from "./utils/validation.js"
import {Passport} from "../../../crypto/concepts.js"
import {crushUsername} from "./utils/crush-username.js"
import {labelize, passportVersion} from "../../../crypto/routines.js"

export type PassportsFileData = {
	format: string
	version: number
	passports: Passport[]
}

export class PassportsFile {
	static readonly format = "https://authlocal.org/"
	static readonly extension = "authlocal"
	static readonly version = 5

	static async #normalize(data: PassportsFileData): Promise<PassportsFileData> {
		if (!data)
			throw new Error(`invalid empty passports file ${data}`)

		if (data.format !== PassportsFile.format)
			throw new Error(`invalid passports file format`)

		if (data.version !== PassportsFile.version)
			throw new Error(`invalid passports file version ${data.version}`)

		const file: PassportsFileData = {
			format: ensure.string("format", data.format),
			version: ensure.number("version", data.version),
			passports: ensure.array("passports", data.passports).map((p): Passport => ({
				id: ensure.string("id", p.id),
				secret: ensure.string("secret", p.secret),
				issued: ensure.number("issued", p.issued),
				version: ensure.number("version", p.version) as Passport["version"],
				label: (ensure.string("name", p.label) && validLabel(p.label))
					? p.label
					: labelize(p.id),
			}))
		}

		for (const passport of file.passports) {
			if (passport.version !== passportVersion)
				throw new Error(`invalid passport version ${passport.version}`)

			// always re-derive all ids to guarantee integrity
			passport.id = await deriveId(passport.secret)
		}

		return file
	}

	static async fromData(raw: any) {
		const data = await PassportsFile.#normalize(raw)
		const passports = new this()
		passports.add(...data.passports)
		return passports
	}

	#map = new Map<string, Passport>()

	list() {
		return [...this.#map.values()]
	}

	add(...additions: Passport[]) {
		for (const passport of additions)
			this.#map.set(passport.id, passport)
		return this
	}

	delete(...deletions: Passport[]) {
		for (const passport of deletions)
			this.#map.delete(passport.id)
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
			passports: [...this.#map.values()],
		}
	}

	filename() {
		const passports = this.list()
		return passports.length === 1
			? `${crushUsername(passports.at(0)!.label)}.${PassportsFile.extension}`
			: `passports.${PassportsFile.extension}`
	}

	href() {
		const text = JSON.stringify(this.toData(), undefined, "\t")
		const encoded = Base64.string(Txt.bytes(text))
		return `data:application/octet-stream;base64,${encoded}`
	}
}

