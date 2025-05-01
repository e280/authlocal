
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

section {
	display: flex;
	padding: 1em;
	gap: 1em;
	background: #37698e;

	> svg {
		flex: 0 0 auto;
		width: 4em;
		height: 4em;
	}

	.alpha {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 1 12em;

		> .label {
			font-size: 1.3em;
			padding: 0.3em 0.5em;
			width: calc(32ch + 1.2em);
			max-width: 100%;
		}

		> input {
			background: #0002;
		}

		> .id {
			font-family: monospace;
			align-self: end;
			color: #fff8;
			text-shadow: .1em .1em .1em #0004;
		}
	}
}

`

