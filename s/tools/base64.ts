
export const base64 = {
	to: {
		text(b64: string) {
			const binary = atob(b64)
			const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
			return new TextDecoder().decode(bytes)
		},
	},
	from: {
		text(text: string) {
			const bytes = new TextEncoder().encode(text)
			const binary = String.fromCharCode(...bytes)
			return btoa(binary)
		},
	},
}

