
export const hex = {
	from: {
		buffer(buffer: ArrayBuffer) {
			return [...new Uint8Array(buffer)]
				.map(byte => byte.toString(16).padStart(2, "0"))
				.join("")
		},
	},
	to: {
		buffer(hex: string) {
			if (hex.length % 2 !== 0)
				throw new Error("must have even number of hex characters")
			const bytes = new Uint8Array(hex.length / 2)
			for (let i = 0; i < hex.length; i += 2)
				bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
			return bytes.buffer
		},
	},
}

