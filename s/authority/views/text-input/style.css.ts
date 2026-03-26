
import {css} from "lit"
export default css`

:host {
	display: block;
	width: 100%;
	max-width: 24em;
}

.box {
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: var(--pad);

	input {
		font-size: 1em;
		padding: var(--pad);
		border: 1px solid color-mix(in oklch, transparent, var(--input) 25%);
		border-radius: var(--round);
		background: var(--input-bg);
		color: var(--input);
		text-shadow: var(--text-shadow);
	}

	.problems {
		font-size: 0.8em;
		padding: 0 var(--pad);
		color: var(--angry);
		min-height: 1.2em;
	}

	&[data-problems] {
		input {
			border-color: var(--angry);
			background: color-mix(in oklch, var(--input-bg), var(--angry) 10%);
		}
	}
}

`

