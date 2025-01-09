
export function migrateStorageKeyRename(storage: Storage, oldKey: string, newKey: string) {
	const oldValue = storage.getItem(oldKey)
	if (oldValue) {
		storage.removeItem(oldKey)
		storage.setItem(newKey, oldValue)
	}
}

