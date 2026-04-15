
import {css} from "lit"
export default css`

ol {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: var(--space);

	width: 100%;
	max-width: 32em;
	margin: 0 auto;

	[view="id-card"] {
		&::part(slot) {
			display: flex;
		}
	}
}

`

