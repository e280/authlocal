
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

	::part(textarea) {
		min-height: 8em;
	}
}

`

