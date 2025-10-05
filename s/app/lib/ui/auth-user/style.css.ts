
import {css} from "lit"
export default css`@layer view {

:host {
	display: inline-flex;
	--icon-size: var(--auth-user-icon-size, 3em);
	--label-max-width: var(--auth-user-label-max-width, 4em);
}

[part="shell"] {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5em;

	padding: 1em;
	border-radius: 0.5em;
	color: color-mix(in oklab, var(--idcolor), #fff 80%);
	background: color-mix(in oklab, var(--idcolor), #4448 90%);
}

.icon {
	color: var(--idcolor, white);
	svg {
		width: var(--icon-size);
		height: var(--icon-size);
	}
}

.box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	gap: 0.2em;
}

[part="label"] {
	font-size: 1.2em;
	width: 100%;
	max-width: 20em;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

[part="id"] {
	font-size: 0.8em;
}

}`

