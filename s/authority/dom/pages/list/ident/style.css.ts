
import {css} from "lit"
export default css`

:host {
	--icon-size: 3em;
	max-width: 100%;
}

[part="card"] {
	display: flex;
	flex-direction: column;
	gap: 0.1em;
	--color: #abc;

	color: color-mix(in oklch, white, var(--color) 40%);
	background: color-mix(in oklch, #1114, var(--color) 20%);
	border: 0.1em solid color-mix(in oklch, transparent, var(--color) 50%);

	> [part="plate"] {
		user-select: none;
		cursor: default;

		display: flex;
		align-items: center;
		text-align: left;
		gap: var(--pad);
		padding: var(--pad);

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

			[part="address"] {
				opacity: 0.8;
				font-size: 0.9em;
				--inactive-opacity: 0.8;
			}
		}

		> slot {
			user-select: auto;
			flex: 0 0 auto;
		}
	}

	> [part="addr"] {
		padding: var(--pad);
		user-select: none;
		font-size: 0.9em;
		background: color-mix(in oklch, #1114, var(--color) 0%);
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

