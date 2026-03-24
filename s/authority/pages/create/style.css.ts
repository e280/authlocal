
import {css} from "lit"
export default css`

[data-step] {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--padding);

	&[data-step="name"] {}

	&[data-step="root"] {
		.cards {
			display: flex;
			align-items: stretch;
			width: max-content;
			margin: calc(var(--padding) * 2) auto;
			gap: calc(var(--padding) * 4);

			> * {
				opacity: 0.2;
				transform: scale(100%);
				user-select: none;

				&:nth-child(2) {
					opacity: 1;
					transform: scale(110%);
					cursor: default;
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
				font-size: 1.5em;
				font-weight: bold;
				&::part(button) {
					padding: var(--padding);
					min-width: 15em;
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

