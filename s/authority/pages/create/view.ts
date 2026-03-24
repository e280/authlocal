
import {Signal} from "@e280/strata"
import {shadow, useCss, useName, useOnce, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {SelectorStep} from "./steps/selector.js"
import {AcornStep} from "./steps/acorn.js"
import {initDraft} from "./utils/init-draft.js"

export type CreateDraft = {
	$index: Signal<number>
	$root: Signal<string>
	$secret: Signal<string>
	$name: Signal<string | null>
}

export const CreatePage = shadow((options: {
		done: (draft: CreateDraft) => void
		back?: () => void
	}) => {

	useName("create page")
	useCss(theme(), styleCss)

	const $step = useSignal<"selector" | "acorn">("acorn")
	const draft = useOnce<CreateDraft>(initDraft)

	function renderStep() {
		switch ($step()) {
			case "selector":
				return SelectorStep({
					draft,
					next: () => $step("acorn"),
					back: options.back,
				})

			case "acorn":
				return AcornStep({
					draft,
					next: () => options.done(draft),
					back: () => $step("selector"),
				})
		}
	}

	return renderStep()
})

