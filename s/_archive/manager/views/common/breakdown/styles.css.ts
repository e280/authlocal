
import {css} from "@benev/slate"
export default css`

:host {
	display: block;
	width: 100%;
}

ul {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	gap: 0.5em;
}

li {
	display: flex;
	align-items: center;
	gap: 0.5em;

	padding: 0.2em 0.5em;
	border-radius: 0.3em;
	border: 1px solid #fff2;
	box-shadow: .1em .2em .5em #0004;

	svg {
		width: 2em;
		height: 2em;
		opacity: 0.5;
	}

	.name {
		font-size: 1.1em;
		font-weight: bold;
	}

	.details {
		display: flex;
		flex-direction: column;
		font-size: 0.7em;
		font-family: monospace;
	}
}

`

