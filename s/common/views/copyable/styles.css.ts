
import {css} from "@benev/slate"
export default css`

[x-copy] {
	user-select: none;
	position: relative;

	slot {
		display: block;
		cursor: copy;
		opacity: 0.8;
		&:is(:hover, :focus) { opacity: 1; }
		&:active { opacity: 0.6; }
	}

	[x-notify] {
		pointer-events: none;
		transition: 250ms linear all;
		position: absolute;
		right: -10%;
		bottom: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.2em 0.5em;
		border-radius: .5em;
		font-family: sans-serif;
		font-weight: bold;
		color: white;
		text-shadow: .05em .10em .07em #0008;
		background: transparent;
		border: .15em solid currentColor;

		&[x-notify="good"] { background: green; }
		&[x-notify="bad"] { background: red; }
	}
}

[x-notify] { opacity: 0; }
[x-copy="good"] [x-notify="good"] { opacity: 1; }
[x-copy="bad"] [x-notify="bad"] { opacity: 1; }

`

