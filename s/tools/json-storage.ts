
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

	function refresh() {
		readable.value = load()
	}

	window.addEventListener("storage", refresh)
	return {signal: readable, save, refresh}
}

