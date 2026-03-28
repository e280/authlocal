
import {css} from "lit"
export default css`

:host {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space);
}

.inputs {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
	width: 100%;
	max-width: 24em;

	::part(textarea) {
		min-height: 8em;
	}
}

`

