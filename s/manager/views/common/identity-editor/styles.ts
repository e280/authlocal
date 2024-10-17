
import {css} from "@benev/slate"
export default css`

section.form {
	> label {
		display: flex;
		flex-direction: column;
		gap: 0.2em;

		+ * {
			margin-top: 1em;
		}

		> :is(span, input):nth-child(2) {
			font-size: 2em;
			font-family: monospace;
		}

		> small {
			display: flex;
			gap: 1em;
			margin-left: auto;
			opacity: 0.5;
		}
	}

	[data-angry] { border: 1px solid red; }
	.angry { color: red; }
}

`

