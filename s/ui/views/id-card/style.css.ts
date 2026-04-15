
import {css} from "lit"
export default css`

:host {
	--icon-size: 2em;
	max-width: 100%;
}

[part="card"] {
	display: flex;
	flex-direction: column;
	gap: 0.1em;
	color: color-mix(in oklch, white, var(--color) 40%);

	> [part="plate"] {
		display: flex;
		align-items: center;
		text-align: left;
		gap: var(--pad);

		padding: var(--pad);
		background: color-mix(in oklch, #1114, var(--color) 10%);
		border: 0.1em solid color-mix(in oklch, transparent, var(--color) 50%);

		[part="icon"] {
			flex: 0 0 auto;
			user-select: none;
			svg {
				display: block;
				width: var(--icon-size);
				height: var(--icon-size);
				color: var(--color);
			}
		}

		[part="name"] {
			flex: 1 1 auto;
			font-size: 1em;
			font-weight: bold;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		> slot {
			flex: 0 0 auto;
		}
	}

	> [part="nomen"] {
		user-select: none;
		opacity: 0.5;
		font-size: 0.9em;
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

[part="nomen"] {
	align-items: baseline;

	font-size: 1em;
	font-family: monospace;

	.nom {
		font-weight: bold;
	}
}

`

