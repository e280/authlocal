
import {css} from "@benev/slate"
export default css`

:host {
	display: flex;
	flex-direction: column;
}

.card {
	display: flex;
	flex-wrap: wrap;
	padding: 1em;
	gap: 1em;
	background: #272727;

	& svg {
		flex: 0 0 auto;
		width: 4em;
		height: 4em;
		stroke-width: 2;
	}

	> .alpha {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 1 auto;
		margin-right: 1em;

		> .label {
			font-size: 1.3em;
			max-width: 90vw;
			overflow: hidden;
			text-overflow: ellipsis;

			text-shadow: .1em .1em .2em #0008;
			font-weight: bold;
			font-family: monospace;
		}

		> input {
			padding: 0.3em 0.5em;
			width: calc(32ch + 1.4em);

			background: #0002;
		}
	}

	> slot {
		display: contents;
	}
}

.id {
	align-self: start;
	margin: 0 1em;

	font-family: monospace;
	color: #fff8;
	text-shadow: .1em .1em .1em #0004;
}

`

