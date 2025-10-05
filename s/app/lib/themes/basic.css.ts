
import {css} from "lit"
import {cssReset} from "@e280/sly"
export const basic = css`

@layer reset, underlay, view, overlay;

${cssReset}

@layer overlay {
	[part="button"] {
		all: unset;
		font: inherit;
		color: inherit;

		cursor: pointer;
		padding: 1em 0.5em;
		border-radius: 0.5em;
		border: 0.1em solid transparent;

		font-weight: bold;
		color: #fff;
		background: #567;
		text-shadow: 0.1em 0.1em 0.1em #0008;
		box-shadow: 0.1em 0.1em 0.3em #0004;
	}
	[part="button"]:hover { background: #678; }
	[part="button"]:active { background: #456; }

	[part="button-login"] {
		all: unset;
		font: inherit;
		color: inherit;

		cursor: pointer;
		padding: 1em 0.5em;
		border-radius: 0.5em;
		border: 0.1em solid transparent;

		font-weight: bold;
		color: white;
		background: #0a0;
		text-shadow: 0.1em 0.1em 0.1em #0008;
		box-shadow: 0.1em 0.1em 0.3em #0004;
	}
	[part="button-login"]:hover { background: #4a4; }
	[part="button-login"]:active { background: #080; }
}

`

