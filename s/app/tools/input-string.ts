
export function inputString(fn: (s: string) => void) {
	return (event: InputEvent) => {
		const input = event.currentTarget as HTMLInputElement
		fn(input.value)
	}
}

