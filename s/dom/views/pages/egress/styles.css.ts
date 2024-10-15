
import {css} from "@benev/slate"
import buttonbarCss from "../../common/styling/buttonbar.css.js"

export default css`

${buttonbarCss}

section {
	text-align: center;

	> * + * { margin-top: 1em; }

	.special {
		margin: 2em auto;
		> * + * { margin-top: 1em; }
	}

	.download {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: 1.1em;

		span {
			font-family: monospace;
			font-weight: bold;
		}

		a {
			padding: 0.5em 1em;
			color: white;
			background: linear-gradient(to bottom, lime, green);
			border-radius: 0.3em;
			box-shadow: .1em .2em .5em #0004;
		}
	}

	.includes {
		ul {
			padding-left: 1em;
			> * {
				margin-top: 0.5em;
			}
		}

		li {
			> span {}
			> small {
				opacity: 0.5;
				font-family: monospace;
				border: 1px solid #fff4;
				border-radius: 1em;
				padding: 0.1em 0.3em;
			}
		}
	}
}

.side-by-side {
	width: 100%;
	display: flex;
	gap: 1em;
	> * { flex: 1 1 16em; }
}

.angry {
	color: red;
}

`

