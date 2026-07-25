
export const view = (b: Uint8Array) =>
	new DataView(b.buffer, b.byteOffset, b.byteLength)

