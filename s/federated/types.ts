
import {Kv} from "@e280/kv"
import {Sub} from "@e280/stz"
import {CSSResultGroup} from "@benev/slate"

export type AuthOptions = {
	kv: Kv
	src: string
	onStorageChange: Sub<[]>
}

export type AuthComponentOptions = {
	theme: CSSResultGroup
}

export type AuthInstallOptions = AuthComponentOptions & AuthOptions

