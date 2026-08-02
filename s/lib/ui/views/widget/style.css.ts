
import {css} from "lit"
export default css`

[part="box"] {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.25em;
	width: max-content;
	max-width: 100%;
}

[view="card"] {
	flex: 1 1 auto;
	min-width: 0;
}

button {
	--fg: #aaa;
	--bg: #222;
	--color0: color-mix(in oklch, transparent, var(--fg) 40%);
	--color1: color-mix(in oklch, transparent, var(--fg) 40%);
	--color2: color-mix(in oklch, transparent, var(--bg) 40%);

	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: var(--gap);

	font-size: 1em;
	padding: var(--pad);
	font-weight: bold;

	cursor: pointer;
	color: var(--fg);
	border: var(--lines) solid var(--color0);
	border-radius: var(--round);
	text-shadow: var(--shadow);

	background: linear-gradient(
		to bottom,
		var(--color1),
		var(--color2)
	);

	&:is(:hover, :focus-visible) {
		filter: brightness(120%);
	}

	&:active {
		filter: brightness(90%);
	}

	svg {
		width: 1em;
		height: 1em;
		filter: drop-shadow(var(--shadow));
	}

	&.sign-in {
		flex: 1 1 auto;
		--fg: color-mix(in oklch, #aaa, var(--alpha));

		svg, strong {
			color: var(--alpha);
		}
	}

	&.sign-out {
		flex: 0 0 auto;

		&::before {
			content: "\\200b";
		}
	}
}

`

