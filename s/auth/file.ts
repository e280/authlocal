
import {versions} from "./versions.js"
import {Identity, IdentityFile} from "./types.js"

export class Authfile {
	static comment = "This is an Authduo identity file, see https://authduo.org/ for more information."
	static splitter = "\n\n"

	static encode(file: IdentityFile): string {
		const content = btoa(JSON.stringify(file))
		return [Authfile.comment, content].join(Authfile.splitter)
	}

	static decode(data: string): IdentityFile {
		const [,base64Content] = data.split(Authfile.splitter)
		return JSON.parse(atob(base64Content))
	}

	static wrap(identities: Identity[]): IdentityFile {
		return {
			version: versions.identityFile,
			identities,
		}
	}
}

