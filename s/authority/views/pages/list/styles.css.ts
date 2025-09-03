
import {css} from "lit"
export default css`

.edit {
	opacity: 0.5;
	border: none;
	box-shadow: none;
	text-shadow: none;
	background: transparent;
}

.identities {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5em;
	width: 100%;

	slate-view { width: 100%; }

	[x-check] {
		cursor: pointer;
		flex: 0 0 auto;
		color: color-mix(in lch, transparent, currentColor 50%);
		border: 0.2em solid currentColor;
		width: 2em;
		height: 2em;
		padding: 0.2em;
		border-radius: 2em;
		
		margin: 0 1em;

		&[x-selected] {
			color: color-mix(in lch, transparent, var(--select) 50%);
			background: var(--select) content-box;
			box-shadow: 0 0 3em color-mix(in lch, transparent, var(--select) 50%);
		}
	}
}

`

