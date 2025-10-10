
import {html} from "@e280/scute"
import {TemplateParts} from "@e280/stz"

export const svgScute = (parts: TemplateParts) => html(
	parts.strings,
	...parts.values,
)

