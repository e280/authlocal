
import {Signal} from "@e280/strata"

export type CreateDraft = {
	$baseSecret: Signal<string>
	$index: Signal<number>
	$secret: Signal<string>
	$alias: Signal<string>
}
