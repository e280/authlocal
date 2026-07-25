
import {got} from "@e280/stz"
import {hash} from "../../../cryp/hash.js"
import {emojis} from "../../emojis/emojis.js"

export function emoji(id: string) {
	const byte = got(hash("emoji", id).at(0))
	return emojis.at(byte)
}

