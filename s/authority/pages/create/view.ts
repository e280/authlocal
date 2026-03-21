
import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {RootView} from "./subpages/root.js"
import {AcornView} from "./subpages/acorn.js"
import {NicknameView} from "./subpages/nickname.js"

export type IdentityDraft = {
	name: string
	root: string
}

export const CreatePage = shadow((done: (draft: IdentityDraft) => void) => {
	useName("create page")
	useCss(theme(), styleCss)

	const $step = useSignal<"nickname" | "root" | "acorn">("nickname")
	const $draft = useSignal<Partial<IdentityDraft>>({})

	function renderStep() {
		switch ($step()) {
			case "nickname":
				return NicknameView(name => {
					$draft({...$draft(), name})
					$step("root")
				})

			case "root":
				return RootView(root => {
					$draft({...$draft(), root})
					$step("acorn")
				})

			case "acorn":
				return AcornView(() => done($draft() as IdentityDraft))
		}
	}

	return html`
		<h2>create your identity</h2>
		${renderStep()}
	`
})

