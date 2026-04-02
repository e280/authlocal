import {css} from "lit"
export default css`

.plate {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space);

	width: 100%;
	max-width: 32em;

	margin: 0 auto;
	padding: 0 var(--pad);
}

.content {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
}

`
