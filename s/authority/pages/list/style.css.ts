
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

	> li {
		display: flex;
		justify-content: center;
		width: 100%;
	}
}

`

