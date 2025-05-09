
import {Thumbprint} from "@e280/stz"
import {Copier} from "./view.js"

export const renderId = (id: string) => {
	const {thumbprint, sigil} = Thumbprint.build.fromHex(id)
	return Copier([thumbprint, sigil])
}

