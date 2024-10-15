
import {css} from "@benev/slate"
import buttonbarCss from "../../common/styling/buttonbar.css.js"

export default css`

${buttonbarCss}

section {
	text-align: center;

	> * + * {
		margin-top: 1em;
	}
}

`

