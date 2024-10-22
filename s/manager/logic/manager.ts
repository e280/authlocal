
import {PassportStore} from "./authstore.js"
import {StoragePersistence} from "./storage-persistence.js"

export class Manager {
	passportStore = new PassportStore()
	storagePersistence = new StoragePersistence()
}

