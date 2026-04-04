
import {css} from "lit"
export default css`

:host {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: var(--pad);
	flex-wrap: wrap;
}

h1 {
	margin: 0;
	font-size: 1.1rem;
	line-height: 1;
}

nav {
	display: flex;
	align-items: center;
	gap: var(--pad);
	flex-wrap: wrap;
}

`

