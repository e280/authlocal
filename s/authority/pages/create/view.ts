
import {html} from "lit"
import {signal, Signal} from "@e280/strata"
import {shadow, useCss, useName, useOnce, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {NameStep} from "./steps/name.js"
import {RootStep} from "./steps/root.js"
import {AcornStep} from "./steps/acorn.js"
import {generateSecret} from "../../../core/index.js"
import {deriveIndexedDraftRoot} from "./utils/generate-id-draft.js"

export type CreateDraft = {
	$name: Signal<string>
	$root: Signal<string>
	$secret: Signal<string>
	$page: Signal<number>
}

export const CreatePage = shadow((options: {
		done: (draft: CreateDraft) => void
		back: () => void
	}) => {

	useName("create page")
	useCss(theme(), styleCss)

	const $step = useSignal<"name" | "root" | "acorn">("name")

	const draft = useOnce<CreateDraft>(() => {
		const startPage = 1
		const secret = generateSecret()
		const root = deriveIndexedDraftRoot(secret, startPage)
		return {
			$name: signal("anon"),
			$root: signal(root),
			$secret: signal(secret),
			$page: signal(startPage),
		}
	})

	function renderStep() {
		switch ($step()) {
			case "name":
				return NameStep({
					draft,
					next: () => $step("root"),
					back: options.back,
				})

			case "root":
				return RootStep({
					draft,
					next: () => $step("acorn"),
					back: () => $step("name"),
				})

			case "acorn":
				return AcornStep({
					draft,
					next: () => options.done(draft),
					back: () => $step("root"),
				})
		}
	}

	return html`
		<h2>create your identity</h2>
		${renderStep()}
	`
})

