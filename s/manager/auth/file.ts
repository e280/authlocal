
import {versions} from "./versions.js"
import {ensure} from "./utils/ensure.js"
import {base64} from "../../tools/base64.js"
import {whence} from "../../tools/whence.js"
import {Identity, IdentityFile} from "./types.js"

export class Authfile {
	static splitter = "::"

	static generateComment(file: IdentityFile) {
		return [
			`This is an Authduo identity file, see https://authduo.org/ for more information.`,
			``,
			...file.identities.flatMap(id => [
				`  - "${id.name}"`,
				`    ${id.thumbprint.slice(0, 8)}, ${whence(id.created)}`,
				``,
			]),
		].join("\n") + "\n"
	}

	static encode(file: IdentityFile): string {
		const content = base64.from.text(JSON.stringify(file))
		return [Authfile.generateComment(file), content].join(Authfile.splitter)
	}

	static decode(data: string): IdentityFile {
		const [,base64Content] = data.split(Authfile.splitter)
		const json = JSON.parse(base64.to.text(base64Content)) as IdentityFile
		return {
			version: ensure.number("file version", json.version),
			identities: ensure.array("array", json.identities.map(id => ({
				version: ensure.number("version", id.version),
				name: ensure.string("name", id.name),
				created: ensure.number("created", id.created),
				thumbprint: ensure.string("thumbprint", id.thumbprint),
				keys: {
					public: ensure.string("public", id.keys.public),
					private: ensure.string("private", id.keys.private),
				},
			})))
		}
	}

	static fromIdentities(identities: Identity[]): IdentityFile {
		return {
			version: versions.identityFile,
			identities,
		}
	}

	static name(file: IdentityFile) {
		return file.identities.length === 1
			? `${crushUsernameForFilename(file.identities.at(0)!.name)}.authduo`
			: `identities.authduo`
	}

	static href(file: IdentityFile) {
		return `data:application/json;base64,${base64.from.text(Authfile.encode(file))}`
	}

	static downloadable(identities: Identity[]) {
		const file = Authfile.fromIdentities(identities)
		return {
			file,
			name: Authfile.name(file),
			href: Authfile.href(file),
		}
	}
}

function crushUsernameForFilename(username: string, maxLength = 24): string {
	const sanitized = username
		.toLowerCase()
		.replace(/[^a-z0-9]/gi, "_")
		.slice(0, maxLength)
		.replace(/^_+|_+$/g, "")
	return sanitized || "identity"
}

