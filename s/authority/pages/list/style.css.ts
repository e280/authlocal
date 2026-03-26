
import {css} from "lit"
export default css`

:host {
	display: flex;
	flex-direction: column;
	gap: var(--space);
}

ol {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: var(--space);

	width: 100%;
	max-width: 32em;
	margin: 0 auto;
	padding: 0 var(--pad);
}

`

