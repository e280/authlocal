
import {css} from "@benev/slate"
export default css`

header.intro {
	text-align: center;
}

nav.passports {
	display: flex;
	flex-direction: column;
	gap: 1em;
	width: max-content;
	max-width: 100%;
}

nav.passports > article {
	display: flex;
	flex-direction: column;
	gap: 0.1em;

	[x-nameplate] {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1em;

		padding: 1em;
		border-radius: 0.5em;
		background: var(--passport-color);
		border-top: 0.15em solid #fff2;
		box-shadow: .1em .2em .5em #0005;

		&[x-purpose="login"] {
			cursor: pointer;
			&:hover { filter: brightness(120%); }
			&:active { filter: brightness(80%); }
		}

		> svg {
			width: 3em;
			height: 3em;
			opacity: 0.2;
		}

		> h2 {
			flex: 1 1 auto;
			padding-right: 1em;
		}
	}

	[x-details] {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0 1em;

		color: #aaa;
		padding: 0 .5em;

		> * {
			flex: 0 0 auto;
			display: flex;
			gap: 1em;
		}

		& span {
			color: color-mix(in srgb, currentColor, transparent 50%);
		}

		& :is(button, .button) {
			opacity: 0.5;
		}
	}
}

`

