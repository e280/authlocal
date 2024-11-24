
import {css} from "@benev/slate"
import buttonbarCss from "../../common/styling/buttonbar.css.js"
export default css`

${buttonbarCss}

section {
	text-align: center;

	> * + * {
		margin-top: 1em;
	}

	input {
		border: 1px solid #fff2;
		border-radius: 0.5em;
		padding: 0.5em;
	}

	.problems {
		color: red;
		padding-left: 1.5em;
		text-align: left;
	}
}

:host > footer {
	margin-top: 4em;
}

`

