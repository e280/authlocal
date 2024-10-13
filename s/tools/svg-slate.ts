
import {svg} from "@benev/slate"
import {TemplateParts} from "./template-string.js"

export const svgSlate = (parts: TemplateParts) => svg(parts.strings, ...parts.values)

