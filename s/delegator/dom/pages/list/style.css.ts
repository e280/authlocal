
import {css} from "lit"
export default css`

ol {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: calc(var(--pad) / 2);

	width: 100%;
	max-width: 32em;
	margin: 0 auto;

	[view="ident"] {
		&::part(slot) {
			display: flex;
		}
	}
}

`

