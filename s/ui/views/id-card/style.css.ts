
import {css} from "lit"
export default css`

.card {
	display: flex;
	align-items: center;
	gap: var(--padding);
	padding: var(--padding);

	background: color-mix(in oklch, #111, var(--color) 5%);
	border: 0.1em solid color-mix(in oklch, transparent, var(--color) 50%);
	color: color-mix(in oklch, white, var(--color) 40%);

	.icon {
		flex: 0 0 auto;
	}

	.content {
		flex: 1 1 auto;
		min-width: 0;

		> * {
			display: flex;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}

.icon svg {
	width: 3em;
	height: 3em;
	color: var(--color);
}

.content {
	display: flex;
	flex-direction: column;
	text-align: left;
}

.name {
	font-size: 1.2em;
	font-weight: bold;
}

[view="shiny-copy"] {
	--inactive-opacity: 0.8;

	&::part(icon) {
		opacity: 0.5;
	}
}

.moniker {
	opacity: 0.5;
	display: flex;
	align-items: baseline;

	font-size: 1em;
	font-family: monospace;

	.sigil {
		font-weight: bold;
	}

	.bulk {
		font-size: 0.7em;
	}
}

`

