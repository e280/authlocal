
import {Nexus} from "@benev/slate"
import {theme} from "../common/theme.js"
import {Idstore} from "./logic/authstore.js"
import {StoragePersistence} from "./logic/storage-persistence.js"

export const nexus = new Nexus({
	theme: theme,
	idstore: new Idstore(),
	storagePersistence: new StoragePersistence(),
})

