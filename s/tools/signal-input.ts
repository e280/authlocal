
import {Signal} from "@benev/slate"

export function signalInput(sig: Signal<any>) {
	return (event: InputEvent) => {
		const input = event.currentTarget as HTMLInputElement
		sig.value = input.value
	}
}

