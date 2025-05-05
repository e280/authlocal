
import {css} from "@benev/slate"
export default css`

:host {
	width: 100%;
	--hover: var(--select);
}

.card {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 0.2em;
	gap: 0.5em;
	min-height: 4.5em;

	background: var(--passport);
	border-radius: 0.5em;
	border: 0.15em solid color-mix(in srgb, transparent, var(--alpha) 20%);
	border-top: 0.15em solid color-mix(in srgb, transparent, var(--alpha) 60%);
	box-shadow: 0 0 2em color-mix(in srgb, transparent, var(--alpha) 10%);

	&:not([x-editable]) {
		user-select: none;
	}

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
		width: 2em;
		height: 2em;
		stroke-width: 2;
		filter:
			drop-shadow(0 0 1em color-mix(in srgb, transparent, currentColor 90%));
	}

	> .label {
		flex: 1 1 10em;

		font-size: 1.3em;
		width: 100%;
		padding: 0.2em 0.5em;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;

		font-weight: bold;
		font-family: monospace;

		color: color-mix(in srgb, var(--alpha), white 50%);
		text-shadow:
			0 0 0.50em color-mix(in srgb, transparent, var(--alpha) 50%),
			0 0 0.25em color-mix(in srgb, transparent, var(--alpha) 50%);
	}

	> slot {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex: 0 1 auto;
		gap: 0.25em;
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
	display: flex;
	flex-wrap: wrap;
	margin: 0 1em;

	font-family: monospace;
	color: color-mix(in srgb, transparent, var(--alpha) 50%);
}

`

