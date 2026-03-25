
import {nomen} from "./nomen.js"
import {Id} from "../../cryp/types.js"
import {delimiter} from "./parts/options.js"

export function nom(id: Id) {
	const longform = nomen(id)
	const shortform = longform.split(delimiter).filter(Boolean)
	shortform.pop()
	return shortform.join(delimiter)
}

