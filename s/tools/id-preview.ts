
import {Bytename, Hex} from "@e280/stz"

export function idPreview(id: string) {
	const bytes = Hex.bytes(id)
	return Bytename.string(bytes.slice(0, 4))
}

