
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
			flex-direction: column;
			gap: var(--padding);
			align-items: stretch;
			width: max-content;

			button {
				border: none;
				padding: 0;
				max-width: 24em;
			}
		}
	}

	&[data-step="acorn"] {
		[view="id-card"] {
			max-width: 24em;
		}

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

