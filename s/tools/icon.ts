
import {svg as slateSvg} from "@benev/slate"
import {html as turtleSvg} from "@benev/turtle"

export function icon(strings: TemplateStringsArray, ...values: any[]) {
	return {
		lit: () => slateSvg(strings, ...values),
		turtle: () => turtleSvg(strings, ...values),
	}
}

