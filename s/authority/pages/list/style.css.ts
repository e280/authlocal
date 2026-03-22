
import {css} from "lit"
export default css`

:host {
	display: flex;
	flex-direction: column;
	gap: var(--padding);
}

ol {
	list-style: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--padding);

	li {
		[view="id-card"] {
			display: block;
		}
	}
}

`

