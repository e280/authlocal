
import {css} from "@benev/slate"
export default css`

.zone {
	position: relative;

	&[x-drop-indicator] {
		&::before {
			border: 0.5rem dashed var(--seed);
			border-radius: 1rem;
			position: absolute;
			display: flex;
			content: "DROP SEED FILE";
			justify-content: center;
			align-items: center;
			font-size: 2em;
			font-weight: bold;
			z-index: 1;
			inset: 0;
			margin: 0;
			color: white;
			background: color-mix(in lch, transparent, var(--seed) 25%);
			backdrop-filter: blur(0.3em);
		}
	}
}

footer {
	margin-top: 4em;
	display: flex;
	justify-content: center;

	.persistence {
		opacity: 0.5;
		font-size: 0.8em;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;

		svg {
			width: 1.5em;
			height: 1.5em;
			stroke-width: 2;
		}
	}
}

`

