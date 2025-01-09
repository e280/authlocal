
import {signal} from "@benev/slate"

export type StorageSignal<T> = ReturnType<typeof storageSignal<T>>

export function storageSignal<T>(key: string) {
	function load(): T | null {
		const value = localStorage.getItem(key)
		try {
			return value ? JSON.parse(value) : null
		}
		catch {
			return null
		}
	}

	const readable = signal(load())

	function save(value: T) {
		localStorage.setItem(key, JSON.stringify(value))
		readable.value = value
	}

	function refresh() {
		return readable.value = load()
	}

	window.addEventListener("storage", refresh)
	return {signal: readable, save, refresh}
}

