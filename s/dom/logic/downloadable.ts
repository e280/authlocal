
import {RenderResult} from "@benev/slate"
import {Authfile} from "../../auth/file.js"
import {Identity, IdentityFile} from "../../auth/types.js"

export function downloadable(identities: Identity[], fn: (filename: string, href: string) => RenderResult) {
	const file = Authfile.wrap(identities)
	return fn(filename(file), href(file))
}

function filename(file: IdentityFile) {
	return file.identities.length === 1
		? `${sanitizeUsername(file.identities.at(0)!.name)}.authduo`
		: `identities.${file.identities.length}.authduo`
}

function href(file: IdentityFile) {
	return `data:application/json;base64,${btoa(Authfile.encode(file))}`
}

function sanitizeUsername(username: string, maxLength = 24): string {
	const sanitized = username
		.toLowerCase()
		.replace(/[^a-z0-9]/gi, "_")
		.slice(0, maxLength)
		.replace(/^_+|_+$/g, "")
	return sanitized || "identity"
}

