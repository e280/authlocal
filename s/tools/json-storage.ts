
import {signal} from "@benev/slate"

export function storageSignal<T>(key: string) {
	function load(): T {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null
	}

	const readable = signal(load())

	function save(value: T) {
		localStorage.setItem(key, JSON.stringify(value))
		readable.value = value
	}

	window.addEventListener("storage", () => {
		readable.value = load()
	})

	return {signal: readable, save, load}
}

