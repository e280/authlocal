
import {Idstore} from "./authstore.js"
import {StoragePersistence} from "./storage-persistence.js"

export class Manager {
	idstore = new Idstore()
	storagePersistence = new StoragePersistence()
}

