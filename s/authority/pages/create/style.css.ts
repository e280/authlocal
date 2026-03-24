
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
		textarea {
			width: 20em;
			min-height: 8em;
			padding: 1em;
			font-size: 1em;
			font-family: monospace;
		}
	}
}

`

