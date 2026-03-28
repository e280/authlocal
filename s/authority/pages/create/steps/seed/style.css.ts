
import {css} from "lit"
export default css`

.plate {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space);

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--pad);
	}

	.concealer {
		width: 20em;
		max-width: 100%;
		color: var(--secret);
	}

	.codebox {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: var(--pad);
		gap: var(--pad);

		background: color-mix(in oklch, #0002, currentColor 20%);
		border: 0.2em solid currentColor;
		box-shadow: 0 0 5em color-mix(in oklch, transparent, currentColor 50%);

		header {
			position: relative;
			z-index: 3;
			display: flex;
			justify-content: end;
			align-items: center;
			gap: var(--pad);

			button {
				padding: 0;
			}

			[view="shiny-copy"] {
				font-size: 1.2em;
			}
		}

		textarea {
			position: relative;
			z-index: 1;
			display: flex;
			font-size: 1em;
			width: 100%;
			min-height: 6em;
			border: none;
			font-family: monospace;
			color: color-mix(in oklch, currentColor, white);
			font-weight: bold;
			text-shadow: 0 0 0.5em var(--secret);
			background: transparent;
			outline: none;
		}

		.blanket {
			position: absolute;
			z-index: 2;
			inset: 0;
			user-select: none;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			background: color-mix(in oklch, #0002, currentColor 20%);
			backdrop-filter: blur(0.4em);
			transition: all var(--anim) linear;
		}

		&:not([data-concealed]) .blanket {
			opacity: 0;
			backdrop-filter: blur(0em);
			pointer-events: none;
		}
	}

	.checkbox {
		font-size: 1.2em;
		font-weight: bold;

		input {
			transform: scale(150%);
			margin-right: 0.5em;
		}
	}
}

`

