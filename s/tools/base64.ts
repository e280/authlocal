
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
		buffer(b: ArrayBuffer) {
			const bytes = new Uint8Array(b)
			const binary = String.fromCharCode(...bytes)
			return btoa(binary)
		},
		text(text: string) {
			return base64.from.buffer(new TextEncoder().encode(text).buffer)
		},
	},

	url: {
		to: {
			base64(b64u: string) {
				const base64 = b64u
					.replace(/-/g, '+')
					.replace(/_/g, '/')
				return base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=')
			},
			buffer(b64u: string) {
				return base64.to.buffer(base64.url.to.base64(b64u))
			},
			text(b64u: string) {
				return base64.to.text(base64.url.to.base64(b64u))
			}
		},

		from: {
			base64(b64: string) {
				return b64
					.replace(/\+/g, '-')
					.replace(/\//g, '_')
					.replace(/=+$/, '')
			},
			buffer(b: ArrayBuffer) {
				return base64.url.from.base64(base64.from.buffer(b))
			},
			text(text: string) {
				return base64.url.from.base64(base64.from.text(text))
			},
		},
	},
}

