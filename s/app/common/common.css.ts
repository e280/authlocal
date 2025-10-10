
import {css} from "lit"
import {cssReset} from "@e280/sly"
export const commonCss = css`

@layer reset, underlay, view, overlay;

${cssReset}

`

