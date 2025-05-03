
import {css} from "@benev/slate"
export default css`

:host {
	width: 100%;
	--hover: var(--select);
}

.card {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1em;
	gap: 0.5em;

	background: var(--passport);
	border-radius: 0.5em;
	border: 0.15em solid color-mix(in srgb, transparent, var(--alpha) 20%);
	border-top: 0.15em solid color-mix(in srgb, transparent, var(--alpha) 60%);
	box-shadow: 0 0 2em color-mix(in srgb, transparent, var(--alpha) 10%);

	&[x-selected] {
		background: var(--passport-select);
		border: 0.15em solid color-mix(in lch, transparent, var(--select) 60%);
		box-shadow: 0 0 2em color-mix(in srgb, transparent, var(--select) 10%);
	}

	&[x-clickable] {
		cursor: pointer;
		&:hover {
			filter: brightness(120%);
			border: 0.15em solid color-mix(in lch, transparent, var(--hover));
			box-shadow: 0 0 3em color-mix(in srgb, transparent, var(--hover) 20%);
		}
	}

	& svg {
		flex: 0 0 auto;
		width: 4em;
		height: 4em;
		stroke-width: 2;
		filter:
			drop-shadow(0 0 1em color-mix(in srgb, transparent, currentColor 90%));
	}

	> .label {
		font-size: 1.3em;
		width: 100%;
		padding: 0.5em 1em;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;

		font-weight: bold;
		font-family: monospace;

		color: color-mix(in srgb, var(--alpha), white 50%);
		text-shadow:
			0 0 0.50em color-mix(in srgb, transparent, var(--alpha) 50%),
			0 0 0.25em color-mix(in srgb, transparent, var(--alpha) 50%);
	}

	> slot {
		display: contents;
	}
}

section {
	container-type: inline-size;
}

@container (width > 32em) {
	.card {
		flex-direction: row;

		.label { text-align: left; }
	}
}

.id {
	align-self: start;
	margin: 0 1em;

	font-family: monospace;
	color: color-mix(in srgb, transparent, var(--alpha) 50%);
}

`

