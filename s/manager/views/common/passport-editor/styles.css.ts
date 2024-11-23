
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

			background: #222;
			border: 1px solid #fff2;
			&[data-angry] { border: 1px solid red; }
		}

		> small {
			display: flex;
			gap: 1em;
			padding: 0 1em;
			color: #666;
		}

		.angry { color: red; }
	}
}

`

