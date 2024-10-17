
import {Nexus} from "@benev/slate"
import {Authcore} from "./auth/core.js"
import {theme} from "../common/theme.js"
import {StoragePersistence} from "./logic/storage-persistence.js"

export const nexus = new Nexus({
	theme: theme,
	authcore: new Authcore(),
	storagePersistence: new StoragePersistence(),
})

