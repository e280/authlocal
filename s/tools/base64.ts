
export const base64 = {
	to: {

		buffer(b64: string): ArrayBuffer {
			const binary = atob(b64)
			const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
			return bytes.buffer
		},

		text(b64: string) {
			return new TextDecoder().decode(base64.to.buffer(b64))
		},

	},
	from: {

		buffer(b: ArrayBuffer): string {
			const bytes = new Uint8Array(b)
			const binary = String.fromCharCode(...bytes)
			return btoa(binary)
		},

		text(text: string) {
			return base64.from.buffer(new TextEncoder().encode(text).buffer)
		},

	},
}

