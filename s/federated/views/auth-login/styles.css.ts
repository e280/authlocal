
import {css} from "@benev/slate"
export default css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:host {
	display: block;
	color: white;
	text-shadow: .04em .08em .06em #0008;
	--card-bg: transparent;
	--login-bg: #684595;
	--logout-bg: #555;
	--card-font-size: 1em;
	--card-align: center;
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
		background: var(--card-bg);
		padding: .5em;
		border-radius: 0.3em;
	}

	.card {
		flex: 1 1 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: var(--card-align);

		font-size: var(--card-font-size);
		overflow: hidden;
		padding: 0 .5em;
		border-radius: 0.3em;

		max-width: 12em;
		background: var(--card-bg);

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
		background: var(--logout-bg);
		font: inherit;
		color: inherit;
		font-weight: bold;
		text-shadow: .04em .08em .06em #0008;
		box-shadow: .1em .2em .3em #0002;

		&.login {
			background: var(--login-bg);
		}

		&:is(:hover, :focus) { filter: brightness(120%); }
		&:active { filter: brightness(80%); }
	}
}

`

