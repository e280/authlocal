import {css} from "lit"
export default css`

:host {
	display: block;
}

.warning {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
	padding: var(--pad);
	border-radius: calc(var(--round) * 0.8);
	border: 0.1em solid currentColor;
	background: color-mix(in oklch, transparent, currentColor 12%);
	color: var(--angry);
}

.warning p {
	margin: 0;
}

.warning code,
.warning strong {
	color: color-mix(in oklch, currentColor, white 18%);
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.35em;
}

.field > span {
	font-size: 0.85em;
	opacity: 0.8;
}

.input {
	width: 100%;
	font: inherit;
	font-family: monospace;
	padding: var(--pad);
	border: 1px solid color-mix(in oklch, transparent, currentColor 35%);
	border-radius: calc(var(--round) * 0.8);
	outline: none;

	color: var(--input);
	background: color-mix(in oklch, var(--input-bg), currentColor 10%);
	text-shadow: var(--text-shadow);
}

.input:focus-visible {
	box-shadow: 0 0 0 0.15em color-mix(in oklch, transparent, currentColor 50%);
}

.actions {
	display: flex;
	justify-content: end;
	flex-wrap: wrap;
	gap: 0.35em;
}

`
