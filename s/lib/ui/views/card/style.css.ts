
import {css} from "lit"
export default css`

[part="card"] {
	--fg: #888;
	transition:
		color var(--anim) linear,
		background var(--anim) linear,
		border var(--anim) linear;

	position: relative;
	display: flex;
	align-items: center;
	flex-direction: row;

	cursor: copy;
	user-select: none;

	gap: var(--pad);
	padding: calc(var(--pad) / 2);
	padding-right: var(--pad);
	border-radius: var(--round);

	color: var(--fg);
	border: var(--lines) solid color-mix(in oklch, transparent, var(--fg) 25%);

	background: color-mix(in oklch, transparent, var(--fg) 10%);
	backdrop-filter: blur(0.4em);

	&:is(:hover, :focus-visible) { filter: brightness(110%); }
	&:active { filter: brightness(90%); }

	[part="icon"] {
		font-size: 2em;
		width: 1.5em;
		height: 1.5em;
		display: grid;
		place-items: center;
		margin: -0.3em;
		margin-left: 0;

		svg {
			display: flex;
			width: 100%;
			height: 100%;
			padding: 0.2em;
			filter: drop-shadow(var(--shadow));
		}
	}

	[part="alias"] {
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	[part="slot"] {
		display: contents;
		cursor: default;
	}

	[part="note"] {
		pointer-events: none;
		position: absolute;
		top: 100%;
		width: 100%;
		font-size: 0.8em;

		color: var(--fg);
		text-align: center;

		opacity: 0.5;
		transition: opacity var(--anim) linear;

		&:not([inert]) {
			opacity: 1;
		}
	}
}

`

