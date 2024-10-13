
import {RenderResult} from "@benev/slate"
import {Authfile} from "../../auth/file.js"
import {Identity} from "../../auth/types.js"

export function downloadable(
		identities: Identity[],
		fn: (filename: string, href: string) => RenderResult,
	) {
	const file = Authfile.fromIdentities(identities)
	return fn(Authfile.name(file), Authfile.href(file))
}

