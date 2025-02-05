
import {Base58, Hex, Urname} from "@benev/slate"

export class Badge {
	readonly thumbprint: string
	readonly string: string
	readonly preview: string

	constructor(public readonly bytes: Uint8Array) {
		if (bytes.length !== 32)
			throw new Error(`badge must be 32 bytes (got ${bytes.length})`)
		this.thumbprint = Hex.string(this.bytes)
		this.preview = Urname.string(this.bytes.slice(0, 4))
		this.string = `${this.preview}-${Base58.string(this.bytes.slice(4))}`
	}

	static fromString(badge: string) {
		const [a, b, b58] = badge.split("-")
		const appetizer = Urname.bytes([a, b].join("-"))
		const entree = Base58.bytes(b58)
		const bytes = new Uint8Array([...appetizer, ...entree])
		return new this(bytes)
	}

	static fromThumbprint(hex: string) {
		const bytes = Hex.bytes(hex)
		return new this(bytes)
	}

	toString() {
		return this.string
	}
}

