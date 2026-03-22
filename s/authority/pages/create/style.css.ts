
import {css} from "lit"
export default css`

[data-step] {
	display: flex;
	flex-direction: column;
	gap: var(--padding);
}

[data-step="name"] {}

[data-step="root"] {}

[data-step="acorn"] {
	textarea {
		width: 20em;
		min-height: 8em;
		padding: 1em;
	}
}

`

