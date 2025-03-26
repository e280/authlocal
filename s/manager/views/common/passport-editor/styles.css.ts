
import {css} from "@benev/slate"
export default css`

:host {
	align-self: stretch;
}

.form {
	> label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		width: 100%;
		margin: auto;
		max-width: 24em;

		> strong {
			padding: 0 1em;
		}

		> input {
			display: block;
			margin: auto;
			width: 100%;
			font-size: 1.5em;
		}

		> .details {
			display: flex;
			gap: 1em;
			padding: 0 1em;
			color: #666;
		}

		> .invalid {
			color: red;
			padding: 0 1em;
		}
	}
}

`

