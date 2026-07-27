
import {css} from "lit"
export default css`

:host {
	--icon-size: 3em;
	max-width: 100%;
}

[part="card"] {
	--color: #abc;

	overflow: hidden;
	border-radius: 0.5em;
	color: color-mix(in oklch, white, var(--color) 40%);
	background: color-mix(in oklch, #1114, var(--color) 20%);
	border: 0.1em solid color-mix(in oklch, transparent, var(--color) 50%);

	user-select: none;
	cursor: default;

	display: flex;
	align-items: center;
	text-align: left;
	gap: var(--pad);
	padding: var(--pad);

	&[data-clickable] {
		cursor: pointer;

		&:is(:hover, :focus-visible) {
			filter: brightness(120%);
		}

		&:active {
			filter: brightness(90%);
		}
	}

	[part="icon"] {
		user-select: none;
		font-size: var(--icon-size);
	}

	[part="name"] {
		flex: 1 1 auto;
		width: 100%;

		> * {
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		[part="alias"] {
			font-size: 1.3em;
			font-weight: bold;
		}
	}

	> slot {
		user-select: auto;
		flex: 0 0 auto;
	}
}

[view="shiny-copy"] {
	display: block;
	width: 100%;
	max-width: 16em;
	--inactive-opacity: 0.8;

	&::part(button) {
		width: 100%;
		gap: 0.2em;
	}

	> * {
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

.dots-button {
	padding: 0;
}

[part="address"] {
	opacity: 0.8;
	font-size: 0.9em;
	--inactive-opacity: 0.8;
}

footer {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 var(--pad);
}

`

