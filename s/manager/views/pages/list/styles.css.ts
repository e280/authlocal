
import {css} from "@benev/slate"
export default css`

.passports {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1em;
	width: 100%;

	.passport {
		display: flex;
		align-items: start;
		justify-content: stretch;
		gap: 0.5em;

		slate-view {
			width: 100%;
		}

		.edit {}
		.login {}
	}
}

`

