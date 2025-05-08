
import {Thumbprint} from "@e280/stz"
import {IdView} from "./view.js"

export const renderId = (id: string) => {
	const {thumbprint, sigil} = Thumbprint.build.fromHex(id)
	return IdView([thumbprint, sigil])
}

