
import {theme} from "../dom/theme.js"
import {Context as SlateContext} from "@benev/slate"

export class Context extends SlateContext {
	theme = theme
}

