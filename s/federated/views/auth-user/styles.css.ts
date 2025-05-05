
import {css} from "@benev/slate"
export default css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:host {
	text-shadow: .04em .08em .06em #0008;
	--id-color: color-mix(in srgb, currentColor, transparent 50%);
	--id-size: 0.8em;
}

[part="box"] {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: end;
	gap: 0.2em;

	max-width: 12em;
	padding: 0 .5em;
	border-radius: 0.3em;

	.label {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	small {
		color: var(--id-color);
		font-size: var(--id-size);
		font-family: monospace;
	}
}

`

