
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

	code {
		whitespace: pre;
		word-break: break-all;
		color: cyan;
	}
}

footer {
	margin-top: 1em;
	display: flex;
	gap: 1em;
	justify-content: center;
}

`

