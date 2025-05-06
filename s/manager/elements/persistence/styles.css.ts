
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

button {
	cursor: pointer;
}

.persistence {
	display: inline-flex;
	align-items: center;
	gap: 0.3em;

	&[x-persisted] { cursor: default; }

	svg {
		width: 1em;
		height: 1em;
		stroke-width: 2;
	}
}

`

