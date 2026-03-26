
import {Signal} from "@e280/strata"

export type CreateDraft = {
	$index: Signal<number>
	$root: Signal<string>
	$secret: Signal<string>
	$name: Signal<string>
}

