
import {css} from "lit"
import {cssReset} from "@e280/sly"
export default css`

${cssReset}

:host {
	--alpha: #00ff93;

	--gap: 0.2em;
	--pad: 0.5em;
	--space: 1em;
	--round: 0.5em;
	--lines: 0.1em;
	--shadow: 0.02em 0.04em 0.08em #0008;

	text-shadow: var(--shadow);
}

`

