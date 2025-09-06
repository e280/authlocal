
import {Kv} from "@e280/kv"
import {Sub} from "@e280/stz"

export type AuthOptions = {
	kv: Kv
	src: string
	onStorageChange: Sub
}

