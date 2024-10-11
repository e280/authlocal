
import {Context as SlateContext} from "@benev/slate"

import {theme} from "./theme.js"

export class Context extends SlateContext {
	theme = theme
}

