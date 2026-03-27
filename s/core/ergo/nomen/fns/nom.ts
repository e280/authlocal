
import {of} from "./of.js"

export function nom(id: string) {
	return of(id).slice(0, 13)
}

