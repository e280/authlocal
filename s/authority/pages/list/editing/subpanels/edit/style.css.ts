import {css} from "lit"
export default css`

:host {
	display: block;
}

.section {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.35em;
}

.input {
	width: 100%;
	font: inherit;
	font-family: monospace;
	padding: var(--pad);
	border: 1px solid color-mix(in oklch, transparent, var(--input) 25%);
	border-radius: calc(var(--round) * 0.8);
	outline: none;

	color: var(--input);
	background: color-mix(in oklch, var(--input-bg), var(--color) 8%);
	text-shadow: var(--text-shadow);
}

.input:focus-visible {
	box-shadow: 0 0 0 0.15em color-mix(in oklch, transparent, var(--color) 50%);
}

.problems {
	margin: 0;
	min-height: 1.2em;
	font-size: 0.8em;
	color: var(--angry);
}

.actions {
	display: flex;
	justify-content: end;
	flex-wrap: wrap;
	gap: 0.35em;
}

`
