
import {shadow, useCss, useName, useOnce, useSignal} from "@e280/sly"
import {CreateDraft} from "./types.js"
import {theme} from "../../utils/theme.js"
import {SeedStep} from "./steps/seed/view.js"
import {initDraft} from "./utils/init-draft.js"
import {SelectorStep} from "./steps/selector/view.js"

export const CreatePage = shadow((options: {
		done: (draft: CreateDraft) => void
		recovery: () => void
		back?: () => void
	}) => {

	useName("create page")
	useCss(theme())

	const $step = useSignal<"selector" | "seed">("selector")
	const draft = useOnce<CreateDraft>(initDraft)

	function renderStep() {
		switch ($step()) {
			case "selector":
				return SelectorStep({
					draft,
					next: () => $step("seed"),
					back: options.back,
					recovery: options.recovery,
				})

			case "seed":
				return SeedStep({
					draft,
					next: () => options.done(draft),
					back: () => $step("selector"),
				})
		}
	}

	return renderStep()
})

