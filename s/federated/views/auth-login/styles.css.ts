
import {css} from "@benev/slate"

export default css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	xxx-outline: 1px solid #f008;
}

:host {
	display: block;
	--color: #684595;
}

.box {
	display: flex;
	align-items: stretch;
	gap: 0.2em;

	> * { flex: 0 0 auto; }

	svg {
		display: block;
		height: 3em;
		aspect-ratio: 1 / 1;
		background: #333;
		padding: .5em;
		border-radius: 0.3em;
	}

	.card {
		flex: 1 1 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		text-align: right;
		padding: 0 .5em;
		border-radius: 0.3em;

		max-width: 12em;
		background: #333;

		.name {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.thumbprint {
			font-family: monospace;
			font-size: 0.6em;
			opacity: 0.5;
		}
	}

	button {
		flex-shrink: 0;
		cursor: pointer;
		padding: 0.6em;
		border: none;
		border-radius: 0.3em;
		background: #555;
		font: inherit;
		color: white;
		font-weight: bold;
		text-shadow: .02em .04em .02em #0008;
		box-shadow: .1em .2em .3em #0002;

		&.login {
			background: var(--color);
		}

		&:is(:hover, :focus) { filter: brightness(120%); }
		&:active { filter: brightness(80%); }
	}
}

`

