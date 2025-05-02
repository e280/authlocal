
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

section {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
}

.box {
	position: relative;
	width: max-content;

	textarea {
		display: block;
		width: 40ch;
		height: 10em;
		font-size: 1.3em;
		padding: 1em;

		color: #ff8181;
		background: #260000;
		text-shadow: .1em .1em .1em #0008;

		&[disabled] {
			pointer-events: none;
			user-select: none;
		}
	}

	.blanket {
		pointer-events: none;
		user-select: none;

		position: absolute;
		inset: 0.5em;
		background: #fff2;
		backdrop-filter: blur(0.3em);
		border-radius: 0.3em;

		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 2em;
		font-family: monospace;
		font-weight: bold;
		text-transform: uppercase;
		color: red;

		transition: all 300ms linear;

		&[x-hide] {
			background: transparent;
			backdrop-filter: blur(0);
			color: transparent;
			text-shadow: 0;
		}
	}

	button {
		position: absolute;
		inset: 0;
		margin: auto;
		width: max-content;
		height: max-content;

		background: #f00;
	}
}

.reveal {
	background: red;
}

footer {
	display: flex;
	gap: 0.5em;
	justify-content: center;
	flex-wrap: wrap;

	button.reveal {
		min-width: 16ch;
	}
}

`

