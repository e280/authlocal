
import {signal} from "@benev/slate"

export function storageSignal<T>(key: string) {
	function get(): T {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null
	}

	const readable = signal(get())

	function set(value: T) {
		localStorage.setItem(key, JSON.stringify(value))
		readable.value = value
	}

	window.addEventListener("storage", () => {
		readable.value = get()
	})

	return {signal: readable, set, get}
}

