
import {css} from "lit"
export default css`

:host {
	display: block;
	max-width: 100%;
}

.panel {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
	margin-top: calc(var(--pad) * 0.75);
	padding: calc(var(--pad) * 1.1);
	border-radius: var(--round);

	color: color-mix(in oklch, white, var(--color) 35%);
	background: color-mix(in oklch, #111a, var(--color) 18%);
	border: 0.1em solid color-mix(in oklch, transparent, var(--color) 45%);
	box-shadow: 0 0 2.5em color-mix(in oklch, transparent, var(--color) 18%);
}

header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: var(--pad);
}

.tabs {
	display: flex;
	flex-wrap: wrap;
	gap: 0.25em;
}

.tabs button {
	padding: 0.2em 0.5em;
	border-radius: 999px;
	color: color-mix(in oklch, currentColor, white 12%);
}

.tabs button[data-active] {
	color: color-mix(in oklch, white, var(--color) 30%);
	background: color-mix(in oklch, transparent, var(--color) 25%);
	box-shadow: 0 0 1.25em color-mix(in oklch, transparent, var(--color) 20%);
}

.close {
	flex: 0 0 auto;
	padding: 0.1em 0.35em;
	font-size: 1.15em;
	line-height: 1;
	opacity: 0.65;
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

.field > span {
	font-size: 0.85em;
	opacity: 0.8;
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

.problems,
.hint,
.warning p {
	margin: 0;
}

.problems {
	min-height: 1.2em;
	font-size: 0.8em;
	color: var(--angry);
}

.hint {
	font-size: 0.9em;
	opacity: 0.8;
}

.hint code,
.warning code,
.warning strong {
	color: color-mix(in oklch, currentColor, white 18%);
}

.actions {
	display: flex;
	justify-content: end;
	flex-wrap: wrap;
	gap: 0.35em;
}

.warning {
	padding: var(--pad);
	border-radius: calc(var(--round) * 0.8);
	border: 0.1em solid currentColor;
	background: color-mix(in oklch, transparent, currentColor 12%);
	color: var(--angry);
}

.warning .input {
	border-color: color-mix(in oklch, transparent, currentColor 35%);
	background: color-mix(in oklch, var(--input-bg), currentColor 10%);
}

[view="recovery-seed"] {
	display: block;
	width: 100%;
	max-width: none;
	font-size: 0.94em;
}

`
