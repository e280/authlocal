
import {css} from "@benev/slate"

export default css`

:host > * {
	display: block;
}

:host > * + * {
	margin-top: 1em;
}

ul, ol {
	list-style: none;
}

`

