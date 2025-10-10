
import {svg} from "lit"
import {TemplateParts} from "@e280/stz"

export const svgLit = (parts: TemplateParts) => svg(
	parts.strings,
	...parts.values,
)

