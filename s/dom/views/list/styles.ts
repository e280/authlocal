
import {css} from "@benev/slate"

export default css`

:host > * + * {
	margin-top: 2em;
}

header.intro {
	opacity: 0.8;
	text-align: center;
	h2 {
		font-size: 1.2em;
		font-weight: normal;
	}
}

nav.identities {
	display: flex;
	flex-direction: column;
	gap: 1em;
}

nav.identities > article {
	display: flex;
	align-items: center;
	padding: 0.5em 2em;
	gap: 1em;
	border-radius: 0.5em;
	border: 1px solid #fff2;

	> svg {
		color: white;
		opacity: 0.2;
		width: 4em;
		height: 4em;
	}

	> section.nameplate {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		gap: 0.1em;

		> h2 {
			font-size: 1.5em;
			flex: 1 1 auto;
		}

		> footer {
			display: flex;
			justify-content: end;
			gap: 1em;

			> :is(button, a.button):not(.happy) {
				opacity: 0.6;
			}
		}
	}

	> section.details {
		display: flex;
		flex-direction: column;
		align-items: end;

		opacity: 0.6;
		font-family: monospace;
	}
}

nav.controls {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 1em;
}

`

