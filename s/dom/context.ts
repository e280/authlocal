
import {theme} from "./theme.js"
import {Authcore} from "../auth/core.js"
import {Context as SlateContext} from "@benev/slate"
import {StoragePersistence} from "./logic/storage-persistence.js"

export class Context extends SlateContext {
	theme = theme
	authcore = new Authcore()
	storagePersistence = new StoragePersistence()
}

