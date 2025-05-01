
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
	}

	.blanket {
		pointer-events: none;
		position: absolute;
		inset: 0.5em;
		background: #fff2;
		backdrop-filter: blur(0.3em);
		border-radius: 0.3em;

		transition:
			background 300ms linear,
			backdrop-filter 300ms linear;

		&[x-hide] {
			background: transparent;
			backdrop-filter: blur(0);
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

	button {
		min-width: 20ch;
	}
}

`

