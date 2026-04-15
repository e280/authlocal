
import {css} from "lit"
export default css`

.plate {
	display: flex;
	flex-direction: column;
	gap: var(--space);

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--pad);
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
