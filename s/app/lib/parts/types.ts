
import {Kv} from "@e280/kv"
import {Sub} from "@e280/stz"
import {CSSResultGroup} from "lit"

export type AuthRequirements = {
	theme: CSSResultGroup

	kv: Kv
	src: string
	onStorageChange: Sub
}

export type AuthOptions = {
	theme: CSSResultGroup

	kv?: Kv
	src?: string
	onStorageChange?: Sub
}

