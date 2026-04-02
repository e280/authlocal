import {css} from "lit"
export default css`

.plate {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space);

	width: 100%;
	max-width: 34em;

	margin: 0 auto;
	padding: 0 var(--pad);
	color: var(--angry);
}

.warning {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
	padding: var(--space);
	border: 0.15em solid currentColor;
	background: color-mix(in oklch, transparent, currentColor 12%);
	box-shadow: 0 0 3em color-mix(in oklch, transparent, currentColor 25%);
}

.warning h2,
.warning p {
	margin: 0;
}

.warning strong,
.warning code {
	color: color-mix(in oklch, currentColor, white 20%);
}

.confirm {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
	width: 100%;
}

.confirm label {
	font-weight: bold;
}

.confirm input {
	font: inherit;
	padding: var(--pad);
	border: 1px solid currentColor;
	color: var(--input);
	background: color-mix(in oklch, var(--input-bg), var(--angry) 10%);
	outline: none;
}

.confirm input:focus-visible {
	box-shadow: 0 0 0 0.15em color-mix(in oklch, transparent, currentColor 50%);
}

`
