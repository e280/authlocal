
import {css} from "lit"
export default css`

[x-plate] {
	display: flex;
	flex-direction: column;
	gap: var(--space);

	.slice {
		display: flex;
		justify-content: center;
	}

	[view="text-input"]::part(input) {
		text-align: center;
	}

	.cards {
		position: relative;
		display: flex;
		align-items: stretch;
		width: max-content;
		margin: 0 auto;
		text-align: center;

		> * {
			user-select: none;

			&:nth-child(1) {
				position: absolute;
				z-index: 1;
				opacity: 0.4;
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
				opacity: 0.4;
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

	.buttons {
		display: flex;
		flex-direction: row;
		gap: var(--pad);
	}
}

`

