
import {css} from "@benev/slate"
import buttonbarCss from "../../common/styling/buttonbar.css.js"
export default css`

${buttonbarCss}

[x-plate] {
	display: flex;
	gap: 2em;
	flex-direction: column;
	align-items: center;
}

header.intro {
	opacity: 0.8;
	text-align: center;
	& h2 {
		font-size: 1.2em;
		font-weight: normal;
	}
	& code {
		font-weight: bold;
		color: gold;
	}
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
		box-shadow: .1em .2em .3em #0002;
		background: linear-gradient(to bottom, #fff2, #fff1);

		&[x-purpose="login"] {
			cursor: pointer;
			&:hover { background: linear-gradient(to bottom, #fff3, #fff2); }
			&:active { background: linear-gradient(to bottom, #8883, #8882); }
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

		> [x-login] {
			background: #783bc2;
			border-top: 0.05em solid #fff4;
			padding: 1em;
			color: white;
			border-radius: 0.5em;
			box-shadow: .1em .2em .3em #0004;
		}
	}

	[x-details] {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0 1em;

		color: #aaa;
		padding: 0 1em;
		font-size: 0.7em;

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

