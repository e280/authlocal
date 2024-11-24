
import {css} from "@benev/slate"
export default css`

:host > * {
	display: block;
}

:host > * + * {
	margin-top: 1em;
}

:host > footer {
	display: flex;
	justify-content: center;
	gap: 1em;
	margin-top: 4em;
}

`

