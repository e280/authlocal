
import {html} from "lit"
import {signal, Signal} from "@e280/strata"
import {shadow, useCss, useName, useOnce, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {NameView} from "./subpages/name.js"
import {RootView} from "./subpages/root.js"
import {AcornView} from "./subpages/acorn.js"
import {generateSecret} from "../../../core/index.js"
import {deriveIndexedDraftRoot} from "./utils/generate-id-draft.js"

export type CreateDraft = {
	$name: Signal<string>
	$root: Signal<string>
	$secret: Signal<string>
	$page: Signal<number>
}

export const CreatePage = shadow((done: (draft: CreateDraft) => void) => {
	useName("create page")
	useCss(theme(), styleCss)

	const $step = useSignal<"name" | "root" | "acorn">("name")

	const draft = useOnce<CreateDraft>(() => {
		const secret = generateSecret()
		const root = deriveIndexedDraftRoot(secret, 0)
		return {
			$name: signal("anon"),
			$root: signal(root),
			$secret: signal(secret),
			$page: signal(0),
		}
	})

	function renderStep() {
		switch ($step()) {
			case "name":
				return NameView({
					draft,
					next: () => $step("root"),
				})

			case "root":
				return RootView({
					draft,
					next: () => $step("acorn"),
					back: () => $step("name"),
				})

			case "acorn":
				return AcornView({
					draft,
					next: () => done(draft),
					back: () => $step("root"),
				})
		}
	}

	return html`
		<h2>create your identity</h2>
		${renderStep()}
	`
})

