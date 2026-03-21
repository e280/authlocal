
import {html} from "lit"
import {shadow, useCss, useName, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {NameView} from "./subpages/name.js"
import {RootView} from "./subpages/root.js"
import {AcornView} from "./subpages/acorn.js"
import {generateSecret} from "../../../core/index.js"

export type IdentityDraft = {
	name: string
	root: string
}

export const CreatePage = shadow((done: (draft: IdentityDraft) => void) => {
	useName("create page")
	useCss(theme(), styleCss)

	const $step = useSignal<"name" | "root" | "acorn">("name")
	const $draft = useSignal<IdentityDraft>({
		name: "anon",
		root: generateSecret(),
	})

	function renderStep() {
		switch ($step()) {
			case "name":
				return NameView({
					name: $draft().name,
					next: name => {
						$draft({...$draft(), name})
						$step("root")
					},
				})

			case "root":
				return RootView({
					name: $draft().name,
					next: root => {
						$draft({...$draft(), root})
						$step("acorn")
					},
				})

			case "acorn":
				return AcornView({
					name: $draft().name,
					root: $draft().root,
					next: () => done($draft() as IdentityDraft),
				})
		}
	}

	return html`
		<h2>create your identity</h2>
		${renderStep()}
	`
})

