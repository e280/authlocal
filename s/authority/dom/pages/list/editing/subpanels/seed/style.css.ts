
import {css} from "lit"
export default css`

:host {
	display: block;
}

.section {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
}

code {
	color: color-mix(in oklch, currentColor, white 18%);
}

[view="recovery-seed"] {
	display: block;
	width: 100%;
	max-width: none;
}

`

