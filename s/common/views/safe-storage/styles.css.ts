
import {css} from "@benev/slate"
export default css`

.persistence {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5em;

	&[x-persisted] { cursor: default; }

	svg {
		width: 1.5em;
		height: 1.5em;
		stroke-width: 2;
	}
}

`

