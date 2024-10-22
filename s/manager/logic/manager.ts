
import {PassportStore} from "./passport-store.js"
import {StoragePersistence} from "./storage-persistence.js"

export class Manager {
	passportStore = new PassportStore()
	storagePersistence = new StoragePersistence()
}

