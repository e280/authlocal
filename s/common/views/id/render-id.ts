
import {Thumbprint, Hex} from "@e280/stz"
import {IdView} from "./view.js"

export const renderId = (id: string) => {
	const bytes = Hex.bytes(id)
	const thumbprint = Thumbprint.string(bytes)
	const {sigil} = Thumbprint.parse(thumbprint)
	return IdView([thumbprint, sigil])
}

