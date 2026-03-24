
import {css} from "lit"
export default css`

[data-step] {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--padding);

	&[data-step="name"] {}

	&[data-step="selector"] {
		overflow: hidden;

		.cards {
			position: relative;
			display: flex;
			align-items: stretch;
			width: max-content;

			> * {
				user-select: none;

				&:nth-child(1) {
					position: absolute;
					z-index: 1;
					opacity: 0.2;
					transform: translateX(calc(min(30dvw, 70%) * -1)) scale(66%);
				}

				&:nth-child(2) {
					position: relative;
					z-index: 2;
					opacity: 1;
					transform: scale(100%);
					cursor: default;
				}

				&:nth-child(3) {
					position: absolute;
					z-index: 1;
					opacity: 0.2;
					transform: translateX(min(30dvw, 70%)) scale(66%);
				}
			}

			button {
				border: none;
				padding: 0;
				width: max-content;
				&:is(:hover, :focus-visible) { opacity: 0.3; }
				&:active { opacity: 0.2; }
			}
		}

		nav {
			display: flex;
			flex-direction: column;
			gap: 0.5em;

			[view="shiny-button"] {
				font-size: 1.2em;
				font-weight: bold;
				&::part(button) {
					padding: var(--padding);
				}
			}

			.boring {
				opacity: 0.5;
			}
		}
	}

	&[data-step="acorn"] {
		.codebox {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 20em;
			padding: calc(var(--padding) * 0.5);
			gap: calc(var(--padding) * 0.5);

			color: var(--secret);
			background: color-mix(in oklch, #0002, currentColor 20%);
			border: 0.2em solid currentColor;
			box-shadow: 0 0 5em color-mix(in oklch, transparent, currentColor 50%);

			header {
				position: relative;
				z-index: 3;
				display: flex;
				justify-content: end;
				align-items: center;

				button {
					border: none;
				}

				[view="shiny-copy"] {
					font-size: 1.5em;
				}
			}

			textarea {
				position: relative;
				z-index: 1;
				display: flex;
				font-size: 1em;
				width: 100%;
				min-height: 6em;
				font-family: monospace;
				border: none;
				color: color-mix(in oklch, currentColor, white);
				background: transparent;
				outline: none;
			}

			.blanket {
				position: absolute;
				z-index: 2;
				inset: 0;
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
}

`

