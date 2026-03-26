
import {css} from "lit"
export default css`

:host {
	--icon-size: 3em;
	max-width: 100%;
}

[part="card"] {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 32em;
	color: color-mix(in oklch, white, var(--color) 40%);

	> [part="plate"] {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		text-align: left;
		gap: var(--pad);

		background: color-mix(in oklch, transparent, var(--color) 10%);
		border: 0.1em solid color-mix(in oklch, transparent, var(--color) 50%);
		padding: var(--pad);

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
			font-size: 1.2em;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	> [part="footer"] {
		user-select: none;
		opacity: 0.5;
		font-size: 0.7em;
	}
}

[view="shiny-copy"] {
	display: block;
	width: 100%;
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

