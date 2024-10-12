
import {theme} from "./theme.js"
import {Context as SlateContext} from "@benev/slate"

export class Context extends SlateContext {
	theme = theme
}

